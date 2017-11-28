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
      break;
    case "test":
      return values.test || defaultValue;
      break;
    case "production":
      return values.production || defaultValue;
      break;
    default:
      return defaultValue;
  }
}
console.log(process.env.NODE_ENV);
export const BACK = `戻る`;
export const CHECKOUT = `お会計`;
export const DEPOSIT = `お預り金`;
export const EVENTS_URI = switchByEnv({
  default: `http://localhost:3001/events/`,
  production: `/events`,
});
export const MINUS = `-`;
export const PAYMENT = `お支払`;
export const PLUS = `+`;
export const SUBTOTAL = `小計`;
export const THE_CHANGE = `お釣り`;
export const YEN = `円`;
export const YEN_MARK = `¥`;