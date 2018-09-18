export const storageSync = (data) => {
    return new Promise((res, rej) => {
        try {
            chrome.storage.sync.set(data, _ => res());
        } catch (err) {
            rej(err);
        }
    })
}

const storageChangeHandlers = [];

export const addStorageWatcher = (func, key = '') => {
    storageChangeHandlers.add({
        handler: func,
        key
    });
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    storageChangeHandlers.map(handlerObj => {
        for (key in changes) {
            var storageChange = changes[key];
            console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
            if (key === handlerObj.key || '' == handlerObj.key) {
                console.log('call outside watcher');
                handlerObj.handler(storageChange.newValue, storageChange.oldValue);
            }
        }
    })

});