const { Op } = require("sequelize");
const models = require("../models");
const { success, error } = require("../utils/ApiResponse");
const { url } = require("../utils/helpers");
const crypto = require('crypto');
const imageRemover = require("../utils/imageRemover");

module.exports.create = async function (req, res) {
  const swap = await models.SwapPost.create(req.SwapData);
  const reference = `ECOSWAP${crypto.randomBytes(4).toString('hex')}`

  if (swap) {
    await Promise.all(
      req.files.map((image) =>
        models.SwapPostImage.create({
          swapPostId: swap.id,
          image: `public/swaps/${image.filename}`,
        })
      )
    );

    const wallet = await models.Wallet.findOne({where: {userId: req.AuthUser.id}});
    if(wallet)
    {
        await wallet.update({
            balance: wallet.balance - 200
        });


        await models.Transaction.create({
            userId: req.AuthUser.id,
            amount: 200,
            status: "success",
            transactionRef: reference,
            description: "charge for swap post"
        });

        return success(res, {}, "swap Posted Successfully");
    }

  }

  return error(res, "Problem Uploading swap");
};

module.exports.fetchSwapInYourCity = async function(req, res)
{
    const swaps = await models.SwapPost.findAll({where: {city: {[Op.like]: `%${req.AuthUser.city}%`}}, include: [
        {
            model: models.SwapPostImage,
            as: "swapImage",
        }
    ]});

    
    
    if(swaps.length > 0)
    {
        const swapDetails = swaps.map((swap) => ({
            id: swap.id,
            title: swap.title,
            description: swap.description,
            swap_preference: swap.swap_preference,
            city: swap.city,
            state: swap.state,
            country: swap.country,
            createdAt: swap.createdAt,
            swapImages: (swap.swapImage).map((image) => url(image.image)),
        }));
        return success(res, swapDetails, "Swaps In your city");
    }

    return error(res, "No Swap found");
}

module.exports.fetchSwapInYourState = async function(req, res)
{
    const swaps = await models.SwapPost.findAll({where: {state: {[Op.like]: `%${req.AuthUser.state}%`}}, include: [
        {
            model: models.SwapPostImage,
            as: "swapImage",
        }
    ]});

    if(swaps.length > 0)
        {
            const swapDetails = swaps.map((swap) => ({
                id: swap.id,
                title: swap.title,
                description: swap.description,
                swap_preference: swap.swap_preference,
                city: swap.city,
                state: swap.state,
                country: swap.country,
                createdAt: swap.createdAt,
                swapImages: (swap.swapImage).map((image) => url(image.image)),
            }));
            return success(res, swapDetails, "Swaps In your city");
        }

    return error(res, "No Swap found");
}

module.exports.fetchSwapInYourCountry = async function(req, res)
{
    const swaps = await models.SwapPost.findAll({where: {country: {[Op.like]: `%${req.AuthUser.country}%`}}, include: [
        {
            model: models.SwapPostImage,
            as: "swapImage",
        }
    ]});

    if(swaps.length > 0)
    {
        const swapDetails = swaps.map((swap) => ({
            id: swap.id,
            title: swap.title,
            description: swap.description,
            swap_preference: swap.swap_preference,
            city: swap.city,
            state: swap.state,
            country: swap.country,
            createdAt: swap.createdAt,
            swapImages: (swap.swapImage).map((image) => url(image.image)),
        }));
        return success(res, swapDetails, "Swaps In your city");
    }

    return error(res, "No Swap found");
}

module.exports.deleteSwapPost = async function(req, res)
{
    const swap = await models.SwapPost.findByPk(req.params.id);

    if(swap)
    {
        const images = await models.SwapPostImage.findAll({where: {swapPostId: swap.id}});

        if(images.length > 0)
        {
            await Promise.all(images.map((image) => {
                imageRemover(image.image);
                return image.destroy();
            }))
        }

        await swap.destroy();
        return success(res, {}, "swap deleted");
    }

    return error(res, "the swap you are trying to delete does not exist");
}