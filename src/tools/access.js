const savePromise = function save(key, val) {
  return new Promise((res, rej) => {
    const data = {};
    data[key] = val;
    chrome.storage.sync.set(data, function() {
      res();
    });
  });
};

const obtainPromise = function obtain(key) {
  return new Promise((res, rej) => {
    chrome.storage.sync.get([key], function(result) {
      res(result[key]);
    });
  });
};

const AccessListeners = {};
const none = () => {};
const addListener = function addListener(key, cb) {
  const listeners = AccessListeners[key] || [];
  listeners.push(cb || none);
};
const removeListener = function removeListener(key) {};

export default {
  obtain: obtainPromise,
  save: savePromise,
  listen(key, cb) {
    addListener(key, cb);
  }
};
