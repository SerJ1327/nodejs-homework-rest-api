import { HttpError } from "../helpers/index.js";

const subscriptionsMiddleware = (subscriptionArr) => {
  return (req, res, next) => {
    try {
      let hasSubscription = false;
      const { subscriptions } = req.user;

      subscriptions.forEach((subscription) => {
        if (subscriptionArr.includes(subscription)) {
          hasSubscription = true;
        }
      });

      if (!subscriptions) {
        HttpError(403, "Forbiden");
      }
      next();
    } catch (error) {
      throw HttpError(403, ` message: ${error.message}`);
    }
  };
};

export default subscriptionsMiddleware;
