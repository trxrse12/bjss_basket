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

exports.list_products = (req,res) => {
    res.status(200).json(goods);
};

exports.show_currency = (req,res) => {
    res.status(200).json(currency);
}