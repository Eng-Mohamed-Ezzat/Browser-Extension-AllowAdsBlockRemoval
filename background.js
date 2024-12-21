chrome.runtime.onInstalled.addListener(() => {
    // Set default class names on installation
    chrome.storage.sync.set({
      classNames: ["visible-block", "Test", "Example"]
    });
  });
  