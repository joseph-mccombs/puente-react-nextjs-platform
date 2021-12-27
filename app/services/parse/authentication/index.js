import { Parse } from 'parse';

function initialize() {
  Parse.initialize(process.env.NEXT_PUBLIC_parseAppId, process.env.NEXT_PUBLIC_parseJavascriptKey);
  Parse.serverURL = process.env.NEXT_PUBLIC_parseServerUrl;
  console.log(`Initialize Parse with App ID: ${process.env.NEXT_PUBLIC_parseAppId}, Javascript Key: ${process.env.NEXT_PUBLIC_parseJavascriptKey}`); // eslint-disable-line
}

function retrieveSignUpFunction(params) {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('signup', params).then((result) => {
      resolve(result);
    }, (error) => {
      reject(error);
    });
  });
}

function retrieveSignInFunction(username, password) {
  return new Promise((resolve, reject) => {
    // sign in with either phonenumber (username) or email handled with logIn
    Parse.User.logIn(String(username), String(password)).then((user) => {
      console.log(`User logged in successful with username: ${user.get('username')}`); // eslint-disable-line
      resolve(user);
    }, (error) => {
      console.log(`Error: ${error.code} ${error.message}`); // eslint-disable-line
      reject(error);
    });
  });
}

function retrieveSignOutFunction() {
  return new Promise((resolve, reject) => {
    Parse.User.logOut().then((result) => {
      resolve(result);
    }, (error) => {
      reject(error);
    });
  });
}

function retrieveForgotPasswordFunction(params) {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('forgotPassword', params).then((result) => {
      resolve(result);
    }, (error) => {
      reject(error);
    });
  });
}

/**
 * Deprecated
 */
function retrieveCurrentUserFunction() {
  const u = Parse.User.current();
  if (u) {
    const user = new Parse.User();
    user.id = u.id;
    user.name = u.get('username');
    user.email = u.get('email');
    user.organization = u.get('organization');
    user.role = u.get('role');
    return user;
  }
  return null;
}

function retrieveCurrentUserAsyncFunction() {
  return Parse.User.current().then((u) => {
    const user = {};
    user.id = u.id;
    user.username = u.get('username');
    user.firstname = u.get('firstname');
    user.lastname = u.get('lastname');
    user.email = u.get('email');
    user.organization = u.get('organization');
    user.role = u.get('role');
    return user;
  });
}

function retrieveDeleteUserFunction(params) {
  Parse.Cloud.run('deleteUser', params).then((result) => result);
}

export {
  initialize,
  retrieveCurrentUserAsyncFunction,
  retrieveCurrentUserFunction, retrieveDeleteUserFunction,
  retrieveForgotPasswordFunction,
  retrieveSignInFunction, retrieveSignOutFunction,
  retrieveSignUpFunction,
};
