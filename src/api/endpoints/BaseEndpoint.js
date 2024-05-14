export default class BaseEndpoint {

  /**
   * Get API endpoint with URL segments filled.
   */
  endpoint() {
    throw new Error('This method must be implemented by sub-classes.');
  }

  /**
   * Prepare payload that will be passed with API request.
   */
  requestPayload() {
    return {};
  }

  /**
   * Prepare payload that will be passed to `success` Redux action handler.
   */
  successPayload() {
    //
  }

  /**
   * Prepare payload that will be passed to `failure` Redux action handler.
   */
  failurePayload() {
    //
  }

}
