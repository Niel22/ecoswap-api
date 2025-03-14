const axios = require("axios");
const { success, error } = require("../utils/ApiResponse");
const crypto = require("crypto");
const models = require("../models");

module.exports.transferFund = async function(req, res)
{
  const sender = await models.User.findOne({where: {email: req.AuthUser.email}});
  const reciever = await models.User.findOne({where: {email: req.TransferData.email}});

    const senderWallet = await models.Wallet.findOne({where: {userId: sender.id}});
    const recieverWallet = await models.Wallet.findOne({where: {userId: reciever.id}});
    const senderReference = `ECOSWAP${crypto.randomBytes(4).toString("hex")}`;
    const recieverReference = `ECOSWAP${crypto.randomBytes(4).toString("hex")}`;

    if (senderWallet?.balance > req.TransferData.amount) {
      if (recieverWallet) {
        await senderWallet.update({
          balance: senderWallet.balance - req.TransferData.amount,
        });

        await models.Transaction.create({
          userId: sender.id,
          amount: req.TransferData.amount,
          status: "Success",
          transactionRef: senderReference.toUpperCase(),
          description: "Transfer Funds",
        });

        await recieverWallet.update({
          balance: recieverWallet.balance + req.TransferData.amount,
        });

        await models.Transaction.create({
          userId: reciever.id,
          amount: req.TransferData.amount,
          status: "Success",
          transactionRef: recieverReference.toUpperCase(),
          description: "Recieved Funds",
        });

        return success(res, {}, "Transfer Succesful");
      }

      await senderWallet.update({
        balance: senderWallet.balance - req.TransferData.amount,
      });

      await models.Transaction.create({
        userId: sender.id,
        amount: req.TransferData.amount,
        status: "Success",
        transactionRef: senderReference.toUpperCase(),
        description: "Transfer Funds",
      });

      await models.Wallet.create({
        userId: reciever.id,
        balance: recieverWallet.balance + req.TransferData.amount,
      });

      await models.Transaction.create({
        userId: reciever.id,
        amount: req.TransferData.amount,
        status: "Success",
        transactionRef: recieverReference.toUpperCase(),
        description: "Recieved Funds",
      });

      return success(res, {}, "Transfer Succesful");
    }
    return error(res, "Insufficient funds");
}

module.exports.initPayment = async function (req, res) {
  const url = "https://sandbox-api-d.squadco.com/transaction/initiate";

  const secretKey = process.env.SQUAD_SECRET_KEY;
  const amount = req.FundData.amount;
  const email = req.AuthUser.email;

  const reference = `ECOSWAP${crypto.randomBytes(4).toString("hex")}`;

  await models.Transaction.create({
    userId: req.AuthUser.id,
    amount: amount,
    status: "pending",
    transactionRef: reference.toUpperCase(),
    description: "wallet funding",
  });

  const payload = {
    amount: amount * 100,
    email: email,
    currency: "NGN",
    initiate_type: "inline",
    transaction_ref: reference.toUpperCase(),
    callback_url: process.env.REDIRECT_URL,
  };

  const headers = {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
  };

  const response = await axios.post(url, payload, { headers });

  if (response?.data?.data) {
    const checkoutUrl = response.data.data.checkout_url;
    return success(res, { checkoutUrl }, "Payment initialization successful");
  }

  return error(res, "Network error, try again later");
};

module.exports.redirect = async function (req, res) {
  const transactionRef = req.query.reference;
  const url = `https://sandbox-api-d.squadco.com/transaction/verify/${transactionRef}`;

  const headers = {
    Authorization: `Bearer ${process.env.SQUAD_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const response = await axios.get(url, { headers });

  if (await updatePayment(response.data.data)) {
    res.send(
      "<h3>Your payment is successfull, you can now go back to the app to continue your swap.</h3>"
    );

    return;
  }
  res.send("<h3>Your payment is not successfull.</h3>");
  return;
};

module.exports.webhook = async function (req, res) {
  if(await updatePayment(req.body.Body))
  {
      return success(res, {}, "Payment Successfull");
    }

    return error(res, "User or Transaction does not exist");
};

async function updatePayment(transaction) {
  const user = await models.User.findOne({
    where: { email: transaction.email },
  });

  if (!user) {
    return false;
  }

  let wallet = await models.Wallet.findOne({ where: { userId: user.id } });

  if (!wallet) {
    wallet = await models.Wallet.create({
      userId: user.id,
    });
  }

  
    const existingTransaction = await models.Transaction.findOne({
      where: { transactionRef: transaction.transaction_ref },
    });

    if (existingTransaction && existingTransaction.status === "pending") {
      const transact_result = await existingTransaction.update({
        status: transaction.transaction_status,
      });

      if (transaction.transaction_status === "Success" || transaction.transaction_status === "success") {
        await wallet.update({
          balance: wallet.balance + transact_result.amount,
        });
        return true;
      }
      return true;
  }
  return false;
}