import axios from 'axios';
export const XHRInstance = axios.create({
  headers: {'X-Authorized-Token': localStorage.authorizedToken}
});