var express = require('express');
var router = express.Router();
const util = require('util');
const config = require('../config');

let access_token = '';
let user_id = '';

// Get access token
router.get('/', function(req, res) {
    res.redirect('https://oauth.vk.com/authorize?client_id=' + config.clientId +
        '&redirect_uri=' + config.host +
        'code&scope=messages,offline&response_type=code&v=5.92');
});

router.get('/code', (req, res) => {
    res.redirect('https://oauth.vk.com/access_token?client_id=' + config.clientId +
        '&redirect_uri=' + config.host +
        'auth&code=' + req.query.code + '&client_secret=' + config.clientSecret);
});

router.post('/auth', (req, res) => {
    access_token = req.body.access_token;
    user_id = req.body.user_id;
    console.log("Access_token: " + access_token + "\nUser_id: " + user_id);
    res.end();
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
