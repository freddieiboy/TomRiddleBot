import crypto from 'crypto';
import config from 'config';
import { receiveTextMsg, welcomeBackMessage, firstWelcomeMessage } from './diary';
import $ from 'jquery';
import { Firebase, FirebaseDb } from '../../config/modules';
const ref = FirebaseDb.ref();
import request from 'request';

const date = new Date();
const time = date.getTime();

import {
  sendImageMessage,
  sendButtonMessage,
  sendGenericMessage,
  sendReceiptMessage,
  loginPrompt,
  callSendAPI
} from './send';
import { sendTextMessage } from './diary';

const APP_SECRET = (process.env.MESSENGER_APP_SECRET) ?
  process.env.MESSENGER_APP_SECRET :
  config.get('fbbot.appSecret');

export const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN) ?
  (process.env.MESSENGER_VALIDATION_TOKEN) :
  config.get('fbbot.validationToken');

export const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
  (process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
  config.get('fbbot.pageAccessToken');

if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN)) {
  console.error("Missing config values");
  process.exit(1);
}

export const addNewUserToDB = (id, body) => {
  // const user = $.parseJSON(body);
  // const user = JSON.parse(body);
  ref.child('users').child(id).transaction((currentData) => {
  // currentData is null for a new user
  if (currentData === null) {
    return {
      firstName: body.first_name,
      lastName: body.last_name,
      isActive: true,
      newAccount: true,
      createdAt: time,
      profileImageURL: body.profile_pic,
      id: id
    };
  } else {
    console.log('User already exists!!')
  }
}, (error) => {
  if (error) {
    console.log('Transaction failed abnormally!', error);
    // callback(false);
  } else {
    console.log('Successfully added user to Firebase.');
  }
  });
}

export const getUserInfoFromFB = (id) => {
  //This gets user name from FB, adds to Firebase, sends welcome message.
  //TODO: separate out these functions
  request({
    uri: 'https://graph.facebook.com/v2.6/',
    qs: {
      id,
      fields: "first_name,last_name,profile_pic,locale,timezone,gender",
      access_token: PAGE_ACCESS_TOKEN
    },
    method: 'GET',

  }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      console.log(response.statusCode, "Successfully got User FB Info");
      const user = JSON.parse(body);
      console.log(user.first_name);

      addNewUserToDB(id, user);
      firstWelcomeMessage(id, user.first_name);
    } else {
      console.error(response.statusCode, "Unable to send message.");
    }
  });
}

const isUserInDatabase = (id) => {
  checkUserDatabase(id, (exists, data) => {
    if (exists) {
      console.log('user exists');
      welcomeBackMessage(data.id, data.firstName);
    } else {
      console.log('user does not exist, adding to database');
      getUserInfoFromFB(id);
    }
  })
}

const checkUserDatabase = (id, callback) => {
  ref.child('users').child(id).once('value', (snapshot) => {
    const exists = (snapshot.val() !== null);
    const data = snapshot.val();
    callback(exists, data);
  });
}
//
// const ifFirstTimeUser = (id) => {
//   checkUserDatabase(id, (exists, data) => {
//     if (exists) {
//       console.log('here is the data:', data)
//       //TODO: send welcome back msg
//     } else {
//       console.log('no data exists')
//     }
//   })
//   //TODO if new account, send welcome message
// }


/*
 * Message Event
 *
 * This event is called when a message is sent to your page. The 'message'
 * object format can vary depending on the kind of message that was received.
 * Read more at https://developers.facebook.com/docs/messenger-platform/webhook-reference#received_message
 *
 * For this example, we're going to echo any text that we get. If we get some
 * special keywords ('button', 'generic', 'receipt'), then we'll send back
 * examples of those bubbles to illustrate the special message bubbles we've
 * created. If we receive a message with an attachment (image, video, audio),
 * then we'll simply confirm that we've received the attachment.
 *
 */
export function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  //NOTE: Do i need these console.log?
  // console.log("Received message for user %d and page %d at %d with message:",
  //   senderID, recipientID, timeOfMessage);
  // console.log(JSON.stringify(message));

  var messageId = message.mid;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;

  if (messageText) {
    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      // case 'image':
      //   sendImageMessage(senderID);
      //   break;
      //
      // case 'button':
      //   sendButtonMessage(senderID);
      //   break;
      //
      // case 'generic':
      //   sendGenericMessage(senderID);
      //   break;
      //
      // case 'receipt':
      //   sendReceiptMessage(senderID);
      //   break;
      case 'dev-login':
        loginPrompt(senderID);
        break;

      case 'dev-map':
        isUserInDatabase(senderID);
        break;

      case 'dev-welcome':
        firstWelcomeMessage(senderID, 'Freddie');
        break;

      default:
        receiveTextMsg(senderID, messageText)
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Oh that's interesting. Adding it to your diary.");
  }
}

/*
 * Verify that the callback came from Facebook. Using the App Secret from
 * the App Dashboard, we can verify the signature that is sent with each
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
export function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    // For testing, let's log an error. In production, you should throw an
    // error.
    console.error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', APP_SECRET)
                        .update(buf)
                        .digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

/*
 * Authorization Event
 *
 * The value for 'optin.ref' is defined in the entry point. For the "Send to
 * Messenger" plugin, it is the 'data-ref' field. Read more at
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference#auth
 *
 */
export function receivedAuthentication(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfAuth = event.timestamp;

  // The 'ref' field is set in the 'Send to Messenger' plugin, in the 'data-ref'
  // The developer can set this to an arbitrary value to associate the
  // authentication callback with the 'Send to Messenger' click event. This is
  // a way to do account linking when the user clicks the 'Send to Messenger'
  // plugin.
  var passThroughParam = event.optin.ref;

  console.log("Received authentication for user %d and page %d with pass " +
    "through param '%s' at %d", senderID, recipientID, passThroughParam,
    timeOfAuth);

  // When an authentication is received, we'll send a message back to the sender
  // to let them know it was successful.
  sendTextMessage(senderID, "Authentication successful");
}

/*
 * Delivery Confirmation Event
 *
 * This event is sent to confirm the delivery of a message. Read more about
 * these fields at https://developers.facebook.com/docs/messenger-platform/webhook-reference#message_delivery
 *
 */
export function receivedDeliveryConfirmation(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var delivery = event.delivery;
  var messageIDs = delivery.mids;
  var watermark = delivery.watermark;
  var sequenceNumber = delivery.seq;

  if (messageIDs) {
    messageIDs.forEach(messageID => {
      console.log("Received delivery confirmation for message ID: %s",
        messageID);
    });
  }

  console.log("All message before %d were delivered.", watermark);
}

/*
 * Postback Event
 *
 * This event is called when a postback is tapped on a Structured Message. Read
 * more at https://developers.facebook.com/docs/messenger-platform/webhook-reference#postback
 *
 */
export function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // console.log('Postback: ', senderID, timeOfPostback);

  // The 'payload' param is a developer-defined field which is set in a postback
  // button for Structured Messages.
  var payload = event.postback.payload;

  // console.log("Received postback for user %d and page %d with payload '%s' " +
  //   "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to
  // let them know it was successful

  //NOTE: checking if user is in Database
  isUserInDatabase(senderID);
  // console.log(event);
  // sendTextMessage(senderID, "Postback called");
}