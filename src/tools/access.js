class Access {
  constructor() {}
}

const save = function save(key, val) {
  return new Promise((res, rej) => {
    const data = {};
    data[key] = val;
    chrome.storage.sync.set(data, function() {
      res();
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
  obtain(key) {},
  save(key, val = null) {},
  listen(key, cb) {
    addListener(key, cb);
  }
};
