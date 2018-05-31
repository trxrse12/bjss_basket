/**
 * Created by Remus on 31/05/2018
 */
const goods = {
    Soup: 0.65,
    Bread: 0.80,
    Milk: 1.15,
    Apples: 1.00
};

const currency_list = {
    EUR:"EUR",
    GBP:"GBP",
    USD:"USD"
};

function getExchangeRate(currency){
    return 1
}

let calculator = function(items,currency){
    let exchange_rate = getExchangeRate(currency);
    let subtotal = 0;
    for (const item in items){
        subtotal += items[item] * goods[item] * exchange_rate;
    }
    return {
        subtotal: subtotal,
        discounts: ["Apples 10% off"],
        discountAmt: 5,
        total:230,
        currency: "GBP"
    }
};

exports.list_products = (req,res) => {
    res.status(200).json(goods);
};

exports.list_currencies = (req,res) => {
    res.status(200).json(currency_list);
};

exports.calculate_basket = (req,res) => {
    if (req.body.items && req.body.currency){
        let my_basket = calculator(req.body.items, req.body.currency);
        res.status(200).json(my_basket);
    }
    else {
        res.status(400).json({msg:"Bad Request"})
    }
};