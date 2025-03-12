const axios = require('axios');
const { success } = require('../utils/ApiResponse');
const crypto = require('crypto');

module.exports.initPayment = async function(req, res)
{
    const url = 'https://sandbox-api-d.squadco.com/payment_link/otp';
    const secretKey = `${process.env.SQUAD_SECRET_KEY}`; 

    const expireDate = new Date();
    expireDate.setMinutes(expireDate.getMinutes() + 2);
    const expireBy = expireDate.toISOString(); 
    const hash = crypto.randomBytes(8).toString('hex');

    const payload = {
        name: 'Eco Wallet Funding',
        hash: hash,
        link_status: 1,
        expire_by: expireBy,
        amounts: [
            {
                amount: req.FundData.amount * 100,
                currency_id: 'NGN'
            }
        ],
        description: 'Payment for funding of ecocoin',
        redirect_link: `${process.env.REDIRECT_URL}`,
        return_msg: 'Successful'
    };

    const headers = {
        Authorization: `Bearer ${process.env.SQUAD_SECRET_KEY}`,
        'Content-Type': 'application/json'
    };

    const paymentLink = `https://sandbox-pay.squadco.com/${payload.hash}`;

    return success(res, paymentLink, "Created");
}