/**
 * Created by Remus on 31/05/2018
 */

var wish = require('wish');
var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect;
var superagent = require('superagent');

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

const currency = 2;

context('\n\n\n\n\n\n\n\n ===>>>: TESTING THE Basket API:',function(){
        describe('\n\n CONTEXT 1: When hit by API request (GET /products), the Basket API: ', function() {
            it("TEST 1.1 (GET /products) >>> should retrieve a list of products", function (done) {
                superagent.get('http://localhost:3000/api/v1.0/products').end(function (err, res) {
                    expect(res).to.exist;
                    console.log("\n       <<< Test 1 (GET 200 /products) result: server says: " + JSON.stringify(res.body));
                    console.log("       <<< Test 1.1 res.status:", res.status);
                    expect(res.status).to.eql(200);
                    done();
                })
            });
        });

        describe('\n\n CONTEXT 2: When hit by API request (GET /currency), the Basket API: ', function(){
            it("TEST 1.2 (GET /currency) >>> should retrieve a list of currencies",function(done){
                superagent.get('http://localhost:3000/api/v1.0/currencies').end(function(err,res){
                    expect(res).to.exist;
                    console.log("\n       <<< Test 1.2 (GET 200 /currencies) result: server says: " + JSON.stringify(res.body));
                    console.log("       <<< Test 1.2 res.status:", res.status);
                    expect(res.status).to.eql(200);
                    done();
                })
            });
        });

        describe('\n\n CONTEXT 3: When hit by API request (POST /basket), the Basket API: ', function(){
            it("TEST 1.3 (POST /basket) >>> should retrieve the cost of associated basket",function(done){
                let apples = 3;
                let milk = 4;
                let soup = 1;

                let itemsString = "Apples, ".repeat(apples) + "Milk, ".repeat(milk) + "Soup, ".repeat(soup);
                itemsString = itemsString.slice(0,-1); // cut the last ","

                superagent.post('http://localhost:3000/api/v1.0/basket').query({
                        items:itemsString,
                        currency: 'EUR'
                })
                .end(function(err,res){
                    expect(res).to.exist;
                    console.log("\n       <<< Test 1.3 result (POST 201 /basket) server says: " + JSON.stringify(res.body));
                    console.log("       <<< Test 1.3 res.status: ", res.status);
                    expect('Content-Type', /json/);
                    expect(res.status).to.eql(200);

                    res.body.should.be.an('object');

                    res.body.should.have.a.property('subtotal');
                    res.body.subtotal.should.be.a('number');
                    res.body.subtotal.should.be.at.least(0);

                    let total_apples = 3 * unitPrice.Apples;
                    let total_milk = 4 * unitPrice.Milk;
                    let total_soup = 1 * unitPrice.Soup;
                    let subtotal = (total_apples + total_milk + total_soup)*currency;

                    let discount_apples = 3 * 0.1 * currency;
                    let discount_milk = Math.floor(4  / specialOffers.Milk.discount_qty) * specialOffers.Milk.discount_amt * currency;
                    let total_discount = (discount_apples + discount_milk);

                    res.body.subtotal.should.be.closeTo(subtotal,0.01); // excluding discount
                    res.body.discountAmt.should.be.closeTo(total_discount,0.01);
                    res.body.total.should.be.closeTo(subtotal - total_discount,0.01); // including discount

                    res.body.should.have.a.property('discounts');
                    res.body.discounts.should.be.an('string');

                    res.body.should.have.a.property('discountAmt');
                    res.body.discountAmt.should.be.a('number');
                    res.body.discountAmt.should.be.at.least(0);

                    res.body.should.have.a.property('total');
                    res.body.total.should.be.a('number');

                    res.body.should.have.a.property('currency');
                    res.body.currency.should.be.a('string');
                    res.body.currency.should.match(/GBP|EUR|USD/);
                    done();
                })
            })
        });
});