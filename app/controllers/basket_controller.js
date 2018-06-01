/**
 * Created by Remus on 31/05/2018
 */
const request = require('request-promise');
const api_key = "27bb418dc482d879cf6757facad81c45"; // can be saved to a file and secured

// unit price array ==> can be further extended to get it from a separate file or database
const unitPrice = {
    Soup: 0.65,
    Bread: 0.80,
    Milk: 1.15,
    Apples: 1.00
};

// discount array ==> can be further extended to get it from a separate file or database
const specialOffers = {
    Milk: {discount_qty: 3,
            discount_amt: 0.5}, // 0.5 price units
    Apples: {discount_qty:1,
            discount_amt: "10%"} // 10%
};

// allowed currencies list ==> can be further extended to get them from a separate file or database
const currency_list = {
    EUR:"EUR",
    GBP:"GBP",
    USD:"USD"
};


function calculate_discount(item,ordered_qty){
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


// promise-based calculator
let calculator = function(items,currency){
    return new Promise((resolve,reject) => {
        let result = request({
            "method":"GET",
            "uri":"http://apilayer.net/api/live?access_key=" + api_key + "&currencies=EUR,GBP",
            "json":true
        })
            .then(function(response){
                return response.quotes;
            })
            .then(exchange_rates => {
                let total = 0; // value after discount (before applying exchange rate)
                let subtotal = 0; // value before discount (before applying exchange rate)
                let itemsArray = items.split(',').map(s => s.trim()); // from string (req.query.items) to clean array of strings
                let discountPerItem = 0;
                let discountsReport = "";
                let totalDiscount = 0;

                let exchange_rate = exchange_rates["USD"+currency] || 0; // any web currency exchange API error will blank all outputs

                // transform the input string into a map
                let itemsMap = new Map();
                for (item of itemsArray){
                    if (itemsMap.get(item)){
                        itemsMap.set(item,itemsMap.get(item)+1);
                    } else {
                        itemsMap.set(item,1);
                    }
                }

                // apply discounts, create discount report and calculate subtotals and total discount (before applying exchange rate)
                // TODO: can be extracted into a separate function (refactoring)
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
                // returns the results
                resolve({
                    subtotal: round2decimals(subtotal * exchange_rate),
                    discounts: discountsReport ,
                    discountAmt: round2decimals(totalDiscount * exchange_rate),
                    total: round2decimals(total * exchange_rate),
                    currency: currency
                })
            })
        .catch(err => {
            console.log('Error:',err)
        })
    });
};

function round2decimals(my_num){
    return Number(my_num.toFixed(2));
}

exports.list_products = (req,res) => {
    res.status(200).json(unitPrice);
};

exports.list_currencies = (req,res) => {
    res.status(200).json(currency_list);
};

//promise-based module export
exports.calculate_basket = function(req,res){
    return new Promise((resolve,reject) => {
        if (req.query.items && req.query.currency && currency_list[req.query.currency]) {
            // promise-based calculator function, will return the basket json when the currency exchange web API answers
            calculator(req.query.items, req.query.currency)
                .then(my_basket => {
                    res.status(200).json(my_basket); // as per the requirements spec
                    resolve("Ok");
                });
        }
        else {
            res.status(400).json({msg: "Bad Request"});
            reject("Bad Request");
        }
    });
};

