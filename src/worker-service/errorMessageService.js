export const buildErrorMessage = errors => {
  return Object.keys(errors).map(key =>
    errors[key].map(msg => key + ' ' + msg)
  ).reduce((prev, curr) => prev.concat(curr));
}
