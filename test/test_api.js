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

        // describe('\n\n CONTEXT 3: When hit by API request (POST /basket), the Basket API: ', function(){
        //     it("TEST 1.3 (POST /basket) >>> should retrieve the cost of associated basket",function(done){
        //         superagent.post('http://localhost:3000/api/v1.0/basket').send({
        //             Items: {
        //                 Apples: 100,
        //                 Milk: 2,
        //                 Soup: 5
        //             },
        //             Curr: "EUR"
        //         })
        //         .end(function(err,res){
        //             expect(res).to.exist;
        //             console.log("\n       <<< Test 1.3 result (POST 201 /basket) server says: " + JSON.stringify(res.body));
        //             console.log("       <<< Test 1.3 res.status: ", res.status);
        //             expect('Content-Type', /json/);
        //             expect(res.status).to.eql(201);
        //             expect(_typeof(res.body)).to.eql('object');
        //             done();
        //         })
        //     })
        // });
});