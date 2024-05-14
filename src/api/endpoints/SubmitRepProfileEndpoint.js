import { BaseEndpoint } from '.';
import * as Api from '../api';

export default class SubmitRepProfileEndpoint extends BaseEndpoint {

  endpoint() {
    return Api.post({
      path: '/api/v1/reps/submit-profile',
      api: process.env.REACT_APP_ONB_API,
    });
  }

}
