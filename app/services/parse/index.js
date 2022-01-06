import {
  initialize,
  retrieveCurrentUserAsyncFunction,
  retrieveCurrentUserFunction, retrieveDeleteUserFunction,
  retrieveForgotPasswordFunction,
  retrieveSignInFunction, retrieveSignOutFunction,
  retrieveSignUpFunction,
} from './authentication';
import countService from './calculate';
import {
  customMultiParamQueryService,
  customQueryService,
  getObjectsByGeolocation,
  postObjectsToClass,
  postObjectsToClassWithRelation,
  removeQueryService,
  residentIDQuery,
  retrieveHelloFunction,
  updateObject,
} from './crud';

export {
  countService,
  customMultiParamQueryService,
  customQueryService,
  getObjectsByGeolocation,
  initialize,
  postObjectsToClass,
  postObjectsToClassWithRelation,
  removeQueryService,
  residentIDQuery,
  retrieveCurrentUserAsyncFunction,
  retrieveCurrentUserFunction, retrieveDeleteUserFunction,
  retrieveForgotPasswordFunction,
  retrieveHelloFunction,
  retrieveSignInFunction, retrieveSignOutFunction,
  retrieveSignUpFunction,
  updateObject,
};
