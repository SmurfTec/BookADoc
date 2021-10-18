import axios from 'axios';

axios.defaults.baseURL = 'https://api.bookadoc.online';
const token = localStorage.getItem('token');
if (localStorage.getItem('token') !== null)
  axios.defaults.headers.common = { 'x-auth-token': token };
const baseUrlProImage = 'http://api.bookadoc.online';

const postUtil = (url, data) =>
  axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

const postUtilMultipart = (url, data) =>
  axios.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

/* const postUtil = (url, data) =>
  axios({
    method: 'post',
    url,
    data,
  }); */
const putUtil = (url, data) =>
  axios({
    method: 'put',
    url,
    data,
  });

const patchUtil = (url, data) =>
  axios({
    method: 'patch',
    url,
    data,
  });

const getUtil = (url, data = null) => axios.get(url, { params: data });

const deleteUtil = (url, data = null) => axios.delete(url, { params: data });

const deleteUtilWithBody = (url, data) =>
  axios({
    method: 'delete',
    url,
    data,
  });

export {
  postUtil,
  postUtilMultipart,
  getUtil,
  putUtil,
  patchUtil,
  deleteUtil,
  deleteUtilWithBody,
  baseUrlProImage,
};

axios.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response.status === 401 ||
      error.response.status === 400 ||
      error.response.status === 404 ||
      error.response.status === 500
    ) {
      return error.response;
    }
    return error;
  },
);
