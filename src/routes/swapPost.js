const express = require('express');
const { create, fetchSwapInYourCity, fetchSwapInYourState, fetchSwapInYourCountry, deleteSwapPost, fetchSingle } = require('../controllers/SwapPostController');
const upload = require('../utils/uploadHelper');
const SwapPostRequest = require('../request/SwapPostRequest');
const makeSwapPostMiddleware = require('../middleware/makeSwapPostMiddleware');
const router = express.Router();

router.get('/city-swap', fetchSwapInYourCity);
router.get('/state-swap', fetchSwapInYourState);
router.get('/country-swap', fetchSwapInYourCountry);
router.delete('/:id', deleteSwapPost);
router.get('/:id', fetchSingle);

router.post('/', makeSwapPostMiddleware, upload("swaps").array("images", 5), SwapPostRequest, create);

module.exports = router;