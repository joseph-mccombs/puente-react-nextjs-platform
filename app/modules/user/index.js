import { Parse } from 'parse';
import { BehaviorSubject } from 'rxjs';

const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

const initialize = () => {
  Parse.initialize(process.env.NEXT_PUBLIC_parseAppId, process.env.NEXT_PUBLIC_parseJavascriptKey);
  Parse.serverURL = process.env.NEXT_PUBLIC_parseServerUrl;
  console.log(`Initialize Parse with App ID: ${process.env.NEXT_PUBLIC_parseAppId}, Javascript Key: ${process.env.NEXT_PUBLIC_parseJavascriptKey}`); // eslint-disable-line
};

const retrieveSignUpFunction = (params) => new Promise((resolve, reject) => {
  Parse.Cloud.run('signup', params).then((result) => {
    resolve(result);
  }, (error) => {
    reject(error);
  });
});

const retrieveSignInFunction = (username, password) => new Promise((resolve, reject) => {
  // sign in with either phonenumber (username) or email handled with logIn
  Parse.User.logIn(String(username), String(password)).then((user) => {
      console.log(`User logged in successful with username: ${user.get('username')}`); // eslint-disable-line
    userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    resolve(user);
  }, (error) => {
      console.log(`Error: ${error.code} ${error.message}`); // eslint-disable-line
    reject(error);
  });
});

const retrieveSignOutFunction = () => new Promise((resolve, reject) => {
  Parse.User.logOut().then((result) => {
    localStorage.removeItem('user');
    userSubject.next(null);
    resolve(result);
  }, (error) => {
    reject(error);
  });
});

const retrieveForgotPasswordFunction = (params) => new Promise((resolve, reject) => {
  Parse.Cloud.run('forgotPassword', params).then((result) => {
    resolve(result);
  }, (error) => {
    reject(error);
  });
});

const retrieveCurrentUserAsyncFunction = () => Parse.User.current().then((u) => {
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

const retrieveDeleteUserFunction = (params) => {
  Parse.Cloud.run('deleteUser', params).then((result) => result);
};

const parseUser = () => userSubject.asObservable();

const parseUserValue = () => userSubject.value;

export {
  initialize,
  parseUser,
  parseUserValue,
  retrieveCurrentUserAsyncFunction,
  retrieveDeleteUserFunction,
  retrieveForgotPasswordFunction,
  retrieveSignInFunction, retrieveSignOutFunction,
  retrieveSignUpFunction,
};
