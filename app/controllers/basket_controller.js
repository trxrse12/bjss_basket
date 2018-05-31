/**
 * Created by Remus on 31/05/2018
 */
const goods = {
    Soup: 0.65,
    Bread: 0.80,
    Milk: 1.15,
    Apples: 1.00
};

const currency = {
    EUR:"EUR",
    GBP:"GBP",
    USD:"USD"
};

const basket = {
    subtotal:0,
    discounts:[{}],
    discountAmt:0,
    total:2.34
};

exports.list_products = (req,res) => {
    res.status(200).json(goods);
};

exports.list_currencies = (req,res) => {
    res.status(200).json(currency);
};

exports.calculate_basket = (req,res) => {
    res.status(200).json(basket);
};