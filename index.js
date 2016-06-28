var express = require('express');
var request = require('request');
var app = express();

app.get('/', function(req, res) {
  res.send('hello word!');
});

app.get('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      var pageId = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        if (messagingEvent.optin) {
          receivedAuthentication(messagingEvent);
        } else if (messagingEvent.message) {
          receivedMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
          receivedDeliveryConfirmation(messagingEvent);
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent);
        } else {
          console.log('Webhook received unknown messagingEvent: ', messagingEvent)
        }
      });
    });

    // Assume all went well.
    // You must send back a 200, within 20 seconds, to let us know you've successfully received the callback. Otherwise, the request will time out
    res.sendStatus(200);
  }
});

var PAGE_ACCESS_TOKEN = 'EAADylrNKe0gBAMGSOXlSZBwvTWCuAHOpAFPivzaYTlBqZB6MtdBHreZCTW1SXytkmIZCdkrzIfncHRA8AURLnkpcNZCw7070524ZCt35lAte66OatMNYp19uvKkZAGxFV4K6EusAp0cuhepuhpvrbr8IR14W8K1WMmjAjLglNpW9QZDZD'

function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientId = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;

  if (messageText) {

    /*
    If we receive a text message, check to see if it matches any special keywords and send back the corresponding example. Otherwise, just echo the text we received.
    */
    switch(messageText) {
      case 'image':
        sendImageMessage(senderID);
        break;
      case 'button':
        sendButtonMessage(senderID);
        break;
      case 'generic':
        sendGenericMessage(senderID);
        break;
      case 'receipt':
        sendReceiptMessage(senderID);
        break;
      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received.")
  }
}

function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    messsage: {
      test: messageText
    }
  };

  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  request({
    uri: '',
    qs: {
      access_token: PAGE_ACCESS_TOKEN
    },
    method: 'POST',
    json: messageData
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log('Successfully sent generic message with id %s to recipient %s', messageId, recipientId);
    } else {
      console.error('Unable to send message.');
      console.error(reponse);
      console.error(error);
    }
  });
}

var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
