const config = require('./config');
const dashbot = config.DASHBOT_API_KEY ? require('dashbot')(config.DASHBOT_API_KEY).facebook : false;


const log_incoming = (request) => {
    if (dashbot){
        dashbot.logIncoming(request.body);
        console.log("Logged to Dashbot");
    }
}

const log_outgoing = (messageData, response) => {
    if (dashbot){
        requestData = set_dashbot_req_data(messageData);
        dashbot.logOutgoing(requestData, response.body);
    }
}

// Analytics Specific Methods  [DELETE WHEN UNNCESSARY]
const set_dashbot_req_data = (messageData) => {
    return {
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: config.FB_PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: messageData
      };
}

exports.log_incoming = log_incoming;
exports.log_outgoing = log_outgoing;