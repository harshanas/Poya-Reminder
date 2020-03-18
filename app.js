const config = require('./config')
const express = require('express');
const bodyParser = require('body-parser');
const poya = require('./poya');
const messenger = require('./messenger');
const logger = require('./logger');

const app = express();
app.use(bodyParser.json());

app.get('/webhook', (request, response) => {
    if (request.query['hub.mode'] == 'subscribe' && request.query['hub.verify_token'] == config.FB_VERIFY_TOKEN){
        response.send(request.query['hub.challenge']);
    }else{
        response.status(403).send("Failed to Verify the Bot")
    }
});

app.post('/webhook', (request, response) => {
    console.log(JSON.stringify(request.body));
    logger.log_incoming(request);
    let messageText;
    let messageData; 
    senderID = request.body.entry[0].messaging[0].sender.id;
    recipientID = request.body.entry[0].messaging[0].recipient.id;

    if (request.body.entry[0].messaging[0].hasOwnProperty('postback')) {
        payload = request.body.entry[0].messaging[0].postback.payload;
        if (payload == "GET_NEXT_POYA_DAY"){
            poya.getNextPoyaDate().then(function(nextPoyaDate){
                daysRem = poya.getDaysRemaining(nextPoyaDate);
                
                messageText = `${daysRem} days remaining for the next Poya Day. :) Next Poya Day will be on  ${nextPoyaDate.format('dddd, Do MMMM YYYY')}`
                messageData = {"messaging_type": "RESPONSE", "recipient": {"id": senderID}, "message": {"text": messageText }}

                messenger.sendMessage(messageData).then(function(resp){
                    console.log(resp.data);
                }).catch(function(error){
                    console.log(error.data);
                })
               
            });
        }
        
        else if (payload == "USER_GET_STARTED"){
            messageText = "Hello! I'm Poya Reminder bot. I can notify you the upcoming poya days :) Tap on 'When is Next Poya' button to see what I can do!";
            messageData = {"messaging_type": "RESPONSE", "recipient": {"id": senderID}, "message": {"text": messageText }}

            messenger.sendMessage(messageData).then(function(resp){
                console.log(resp.data);
            }).catch(function(error){
                console.log(error.data);
            })

        }else if (payload == "DEVELOPER_INFO"){
            messageText = "Poya Reminder notifies you about upcoming poya Dates in Sri Lanka. This creation is an inspiration of NextPoyaWhen.com by Thameera Senanayake. This bot uses NextPoyaWhen.com's API to retrieve the poya dates.\n\nThis is an open source project and All are welcome to suggest new features, report issues and contribute :)";
            messageData = {"recipient":{"id":senderID},"message":{"attachment":{"type":"template","payload":{"template_type":"button", "text":messageText,
                      "buttons":[
                        {"type":"web_url", "url":"https://github.com/harshanas/Poya-Reminder","title":"Contribute on GitHub"},
                        {"type":"web_url", "url":"https://nextpoyawhen.com/","title":"Visit NextPoyaWhen.com"}  ]}}}}

            messenger.sendMessage(messageData).then(function(resp){
                console.log(resp.data);
            }).catch(function(error){
                console.log(error.data);
            })

        }
        
        
    }else{
        messageText = "Please use the buttons in the menu to access the bot";
        messageData = {"messaging_type": "RESPONSE", "recipient": {"id": senderID}, "message": {"text": messageText }}
    }

    

    response.send("Message Recieved");
});


app.listen(config.port, () => console.log(`Bot is listening on port ${config.port}`));