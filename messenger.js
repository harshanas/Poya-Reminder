const config = require('./config');
const axios = require('axios');
const logger = require('./logger');


const sendMessage = (message_data) => {
  return new Promise(function(resolve, reject){
    axios({
        method: 'post',
        url: `https://graph.facebook.com/v6.0/me/messages?access_token=${config.FB_PAGE_ACCESS_TOKEN}`,
        data:message_data
    }).then(function(response){
        resolve(response);
        logger.log_outgoing(message_data, response)
    }).catch(function(error){
        reject(error);
    })
  })
}

exports.sendMessage = sendMessage;