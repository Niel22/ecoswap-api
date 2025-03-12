const axios = require('axios');
const { success } = require('../utils/ApiResponse');
const crypto = require('crypto');
const models = require("../models");

module.exports.initPayment = async function(req, res)
{
    const url = 'https://sandbox-api-d.squadco.com/payment_link/otp';
    
    const amount = req.FundData.amount;
    const secretKey = process.env.SQUAD_SECRET_KEY;

    const hash = crypto.randomBytes(8).toString('hex');

    const expireDate = new Date();
    expireDate.setMinutes(expireDate.getMinutes() + 2);
    const expireBy = expireDate.toISOString();

    const payload = {
        name: 'Wallet Funding',
        hash: hash,
        link_status: 1,
        expire_by: expireBy,
        amounts: [
            {
                amount: amount * 100,
                currency_id: 'NGN',
            },
        ],
        description: 'Payment for funding of ecocoin',
        return_msg: 'Successful',

    };

    const headers = {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json'
    };

    const response = await axios.post(url, payload, { headers });
    const paymentLink = `https://sandbox-pay.squadco.com/${payload.hash}`;

    return success(res, paymentLink, "Created");
}

module.exports.redirect = async function(req, res){
    const transactionRef = req.query.reference;
    const url = `https://sandbox-api-d.squadco.com/transaction/verify/${transactionRef}`;
    
    const headers = {
        Authorization: `Bearer ${process.env.SQUAD_SECRET_KEY}`,
        'Content-Type': 'application/json'
    };

    const response = await axios.get(url, { headers });

    if(await updatePayment(response.data.data)){

        res.send('<h3>Your payment is successfull, you can now go back to the app to continue your swap.</h3>');
    }
    res.send('<h3>Your payment is not successfull.</h3>');

}

async function updatePayment (transaction){
    const user = await models.User.findOne({where: {email: transaction.email}});
    const wallet = await models.Wallet.findOne({where: {userId: user.id}});

    if(user)
    {
        const transact_result = await models.Transaction.create({
            userId: user.id,
            amount: Number(transaction.amount) / 100,
            status: transaction.status,
            transactionRef: transaction.transaction_ref
        });

        if(transact_result?.status === 'success')
        {
            await wallet.update({
                balance: wallet.balance + transact_result.amount
            })
            return true;
        }

    }
    return false;
}