// Base Handler Class
class Handler {
  setNext(handler) {
    this.next = handler; // Sets the next handler in the chain
    return handler;      // Enables chaining
  }

  handle(request) {
    if (this.next) {
      return this.next.handle(request); // Pass to the next handler
    }
    console.log("No handler could process the request.");
  }
}

// Concrete Handlers
class AuthHandler extends Handler {
  handle(request) {
    if (request.authenticated) {
      console.log("Authentication passed.");
      return super.handle(request); // Pass to the next
    }
    console.log("Authentication failed.");
  }
}

class ValidationHandler extends Handler {
  handle(request) {
    if (request.valid) {
      console.log("Validation passed.");
      return super.handle(request); // Pass to the next
    }
    console.log("Validation failed.");
  }
}

class LogHandler extends Handler {
  handle(request) {
    console.log("Logging request: ", request);
    return super.handle(request); // Pass to the next
  }
}

// Build the Chain
const authHandler = new AuthHandler();
const validationHandler = new ValidationHandler();
const logHandler = new LogHandler();

authHandler.setNext(validationHandler).setNext(logHandler);

// Send a Request
const request = {
  authenticated: true,
  valid: true,
};

authHandler.handle(request);

