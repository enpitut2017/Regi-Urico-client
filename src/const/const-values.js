function switchByEnv(values) {
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
}

export const BACK = `戻る`;
export const BASE_URI = switchByEnv({
  default: `http://localhost:3001`,
  production: ``,
});
export const CHECKOUT = `お会計`;
export const DEPOSIT = `お預り金`;
export const EVENTS_URI = `/events/`;
export const MINUS = `-`;
export const PAYMENT = `お支払`;
export const PLUS = `+`;
export const SUBTOTAL = `小計`;
export const THE_CHANGE = `お釣り`;
export const YEN = `円`;
export const YEN_MARK = `¥`;