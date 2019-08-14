var express = require('express');
var router = express.Router();
const util = require('util');
const axios = require('axios');
const config = require('../config');

// Get access token
router.get('/', function(req, res) {
    res.redirect('https://oauth.vk.com/authorize?client_id=' + config.clientId +
        '&redirect_uri=' + config.host +
        'auth&scope=offline&response_type=code&v=5.92');
});

router.get('/auth', async (req, res) => {
    res.redirect('https://oauth.vk.com/access_token?client_id=' + config.clientId +
        '&redirect_uri=' + config.host +
        'auth&code=' + req.query.code + '&client_secret=' + config.clientSecret);
});

// Listen to VK callback API
router.post('/', async (req, res) => {
    switch (req.body.type) {
        case 'confirmation':
            res.status(200);
            res.send(config.callbackApiKey);
            break;

        default:
            console.log(util.inspect(req.body));
            res.status(200);
            res.send('ok');
    }
});

module.exports = router;
