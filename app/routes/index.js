/**
 * Created by Remus on 31/05/2018
 */

const {Router} = require('express');
const router = Router();
const basket_controller = require('../controllers/basket_controller');

router.get('/products',basket_controller.list_products);
router.get('/currencies',basket_controller.list_currencies);
router.post('/basket',(req,res,next) => {
    basket_controller.calculate_basket (req,res) // basket_controller is promise-based, as it depends on retrieving the currency from Internet
        .then(result => console.log(result))
        .catch(err => console.log(err))
});

module.exports = router;