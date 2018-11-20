import store from "@/tools/store";

chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },
  tabs => {
    store.actions.updateOriginalText(tabs[0].url);
  }
);
