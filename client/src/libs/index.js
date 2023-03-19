import axios from './http';

function httpPost(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(data => {
      resolve(data);
    }).catch(err => {
      reject(err);
    })
  });
};

function httpGet(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    });
  });
};

export {
  httpPost,
  httpGet
}