/**
 * Created by Remus on 31/05/2018
 */

const {Router} = require('express');
const router = Router();
const basket_controller = require('../controllers/basket_controller');

router.get('/products',basket_controller.list_products);
router.get('/currencies',basket_controller.list_currencies);

module.exports = router;