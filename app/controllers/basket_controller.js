/**
 * Created by Remus on 31/05/2018
 */
const unitPrice = {
    Soup: 0.65,
    Bread: 0.80,
    Milk: 1.15,
    Apples: 1.00
};

const specialOffers = {
    Milk: {discount_qty: 3,
            discount_amt: 0.5},
    Apples: {discount_qty:1,
            dicount_amt: "10%"}
};

const currency_list = {
    EUR:"EUR",
    GBP:"GBP",
    USD:"USD"
};

function getExchangeRate(currency){
    return 2
}

let calculator = function(items,currency){
    let exchange_rate = getExchangeRate(currency);
    let subtotal = 0;
    let itemsArray = items.split(',').map(s => s.trim()); // from string to clean array of strings
    for (item of itemsArray){
        if (unitPrice[item]){
            subtotal += unitPrice[item] * exchange_rate;
        }
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
    res.status(200).json(unitPrice);
};

exports.list_currencies = (req,res) => {
    res.status(200).json(currency_list);
};

exports.calculate_basket = (req,res) => {
    if (req.query.items && req.query.currency){
        let my_basket = calculator(req.query.items, req.query.currency);
        res.status(200).json(my_basket);
    }
    else {
        res.status(400).json({msg:"Bad Request"})
    }
};