var express = require('express');
var router = express.Router();
const util = require('util');
const axios = require('axios');
const config = require('../config');

let result = '';

router.get('/', (req, res) => {
    res.send(result);
});

// Listen to VK callback API
router.post('/', async (req, res) => {
    switch (req.body.type) {
        case 'confirmation':
            res.status(200);
            res.send(config.callbackApiKey);
            break;

        case 'message_new':
            let message = encodeURIComponent("Здравствуйте! Ваше сообщение: '" + req.body.object.body + "'");
            let result = await axios.get("https://api.vk.com/method/messages.send?v=5.89&access_token=" + config.access_token +
                "&user_id=" + req.body.object['user_id'] +
                "&message=" + message);

            res.render(result);
            break;

        default:
            console.log(util.inspect(req.body));
            res.status(200);
            res.send('ok');
    }
});

module.exports = router;
