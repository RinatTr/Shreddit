// Custom middleware to log outgoing responses
const logSends = (req, res, next) => {
    // Store the original res.send and res.json functions
    const originalSend = res.send;
    const originalJson = res.json;
  
    // Override res.send to log the response and then call the original function
    res.send = function (body) {
      console.log(req.method, "res:", req.originalUrl, "body:", body.status, ":", body.message, body)
      originalSend.apply(res, arguments);
    };
  
    // Override res.json to log the response and then call the original function
    res.json = function (body) {
      console.log(req.method, "res:", req.originalUrl, "body:", body.status, ":", body.message, body)
      originalJson.apply(res, arguments);
      console.log("===========================================\n")
    };
  
    // Continue to the next middleware or route handler
    next();
  };

  module.exports = logSends;