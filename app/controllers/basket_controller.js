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
            discount_amt: 0.5}, // 50%
    Apples: {discount_qty:1,
            discount_amt: "10%"} // 10%
};

const currency_list = {
    EUR:"EUR",
    GBP:"GBP",
    USD:"USD"
};

function getExchangeRate(currency){
    return 2
}

function calculate_discount(item,ordered_qty,currency){
    let discountedItem = "";
    discountedItem = specialOffers[item] || ""; // any discount for it???

    if (discountedItem && ordered_qty>=discountedItem.discount_qty) { // if the ordered qty >= min qty needed for discount
        // two different cases: the discount is a percentage or an absolute value
        let discountIfPercentage = (unitPrice[item]*Math.floor(ordered_qty/discountedItem.discount_qty) * parseFloat(discountedItem.discount_amt)/100) ;
        let discountIfAbsolute =  (Math.floor(ordered_qty/discountedItem.discount_qty)*parseFloat(discountedItem.discount_amt)) ;
        return /\%/.test(discountedItem.discount_amt) ? discountIfPercentage : discountIfAbsolute;
    } else {
        return 0;
    }
}



let calculator = function(items,currency){
    let exchange_rate = getExchangeRate(currency);
    let total = 0;
    let subtotal = 0;
    let itemsArray = items.split(',').map(s => s.trim()); // from string to clean array of strings
    let discountPerItem = 0;
    let discountsReport = "";
    let totalDiscount = 0;

    // transform the input string into a map
    let itemsMap = new Map();
    for (item of itemsArray){
        if (itemsMap.get(item)){
            itemsMap.set(item,itemsMap.get(item)+1);
        } else {
            itemsMap.set(item,1);
        }
    }

    itemsMap.forEach((ordered_qty,item) => {
        if (unitPrice[item]){ // for each VALID product in the basket
            discountPerItem = calculate_discount(item,ordered_qty);
            if (discountPerItem>0){
                discountsReport += " " + item + ":" + specialOffers[item].discount_qty + " >>> "  + specialOffers[item].discount_amt + ";";
            }
            subtotal += ordered_qty * unitPrice[item];
            totalDiscount += discountPerItem;
        }
    });

    total += subtotal - totalDiscount;

    return {
        subtotal: subtotal * exchange_rate,
        discounts: discountsReport ,
        discountAmt: totalDiscount * exchange_rate,
        total:total * exchange_rate,
        currency: currency
    }
};

exports.list_products = (req,res) => {
    res.status(200).json(unitPrice);
};

exports.list_currencies = (req,res) => {
    res.status(200).json(currency_list);
};

exports.calculate_basket = (req,res) => {
    if (req.query.items && req.query.currency && currency_list[req.query.currency]){
        let my_basket = calculator(req.query.items, req.query.currency);
        res.status(200).json(my_basket);
    }
    else {
        res.status(400).json({msg:"Bad Request"})
    }
};