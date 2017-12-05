import axios from 'axios';
export const createXHRInstance = () => {
  return axios.create({
    headers: {'X-Authorized-Token': localStorage.authorizedToken}
  })
};