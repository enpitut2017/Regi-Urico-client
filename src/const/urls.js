const switchByEnv = values => {
  let defaultValue = undefined;
  if (values.default) {
    defaultValue = values.default;
  }
  if (process.env.NODE_ENV === "development") {
    return values.development || defaultValue;
  }
  switch (process.env.NODE_ENV) {
    case "development":
      return values.development || defaultValue;
    case "test":
      return values.test || defaultValue;
    case "production":
      return values.production || defaultValue;
    default:
      return defaultValue;
  }
};

export const BASE_URI = switchByEnv({
  development: `http://localhost:3001`,
  test: `http://localhost:3001`,
  production: `http://210.140.221.144`,
  default: `http://210.140.221.144`
});

export const CHANGE_ACCOUNT_URI = `/sellers/`;
export const DELETE_ACCOUNT_URI = `/sellers/`;
export const EVENTS_URI = `/events/`;
export const EVENT_ITEMS_URI = `/event_items`;
export const REGISTER_URI = `/register`;
export const SIGNIN_URI = `/signin/`;
export const SIGNUP_URI = `/sellers/`;
