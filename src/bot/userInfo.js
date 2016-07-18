import request from 'request';
import { Firebase, FirebaseDb } from '../modules';
import { store, setHydrateUsers } from '../store/users';
const ref = FirebaseDb.ref();

const date = new Date();
const time = date.getTime();

let storeUsers = [];

store.subscribe(() =>
  storeUsers = store.getState().users
)

export const hydrateUsers = () => {
  ref.child('users').orderByChild('isActive').equalTo(true).on('child_added', (snapshot) => {
    const user = snapshot.val();
    const userObject = {
      id: user.id,
      firstName: user.firstName,
      gender: user.gender
    }
    return store.dispatch(setHydrateUsers(userObject))
  })
}

export const initUserCheck = (id) => {
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

export const addNewUserToDB = (id, body) => {
  // const user = $.parseJSON(body);
  // const user = JSON.parse(body);
  ref.child('users').child(id).transaction((currentData) => {
  // currentData is null for a new user
  if (currentData === null) {
    return {
      firstName: body.first_name,
      lastName: body.last_name,
      timezone: body.timezone,
      gender: body.gender,
      isActive: true,
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

const welcomeBackMessage = (recipientId, name) => {
  const messageText = 'Welcome back, ' + name + '.'

  sendTextMessage(recipientId, messageText);
}

const firstWelcomeMessage = (recipientId, name) => {
  console.log('this is from welcome message', recipientId);
  const messageText = 'Welcome to your conversational diary, ' + name + '. My name is Tom Riddle.'

  sendTextMessage(recipientId, messageText);
}
