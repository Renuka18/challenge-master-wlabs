class HTTPError extends Error {
    constructor(message) {
      super();
      this.message = message;
    }
  
    getCode() {
      if (this instanceof BadRequest) {
        return 400;
      } if (this instanceof NotFound) {
        return 404;
      }
      return 500;
    }
  }
  
  class BadRequest extends HTTPError { }
  class NotFound extends HTTPError { }
  
  module.exports = {
    HTTPError,
    BadRequest,
    NotFound
  };