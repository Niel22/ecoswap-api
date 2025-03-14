const { url } = require("../utils/helpers")

module.exports.ProfileResource = function(data){
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        image: url(data.image),
        balance: data.balance,
        active: data.active ? "true" : "false",
        user_type: data.is_admin ? "admin" : "user",
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country
    }
}