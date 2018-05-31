/**
 * Created by Remus on 31/05/2018
 */

var wish = require('wish');
var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect;
var superagent = require('superagent');



context('\n\n\n\n\n\n\n\n ===>>>: TESTING THE Basket API:',function(){
        describe('\n\n CONTEXT 1: When hit by API request (GET /products), the Basket API: ', function() {
            it("TEST 1.1 (GET /products) >>> should retrieve a list of products", function (done) {
                superagent.get('http://localhost:3000/api/v1.0/products').end(function (err, res) {
                    expect(res).to.exist;
                    console.log("\n       <<< Test 1 (GET 200 /products) result: server says: " + JSON.stringify(res.body));
                    console.log("       <<< Test 1.1 res.status:", res.status);
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
                    done();
                })
            });
        })
});