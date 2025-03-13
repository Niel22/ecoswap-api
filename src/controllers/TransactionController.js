const { Transaction } = require('sequelize');
const models = require('../models');
const { success } = require('../utils/ApiResponse');

module.exports.fetchAllTransaction = async function(req, res)
{
    const transactions = await models.Transaction.findAll({where: {userId: req.AuthUser.id}, order: [['createdAt', 'DESC']],});

    if(transactions.length > 0)
    {
        return success(res, transactions.map((transaction) => (
        {
            id: transaction.id,
            userId: transaction.userId,
            amount: transaction.amount,
            status: transaction.status,
            transactionRef: transaction.transactionRef,
            description: transaction.description
        }
        )), "All Transaction record")
    }
}