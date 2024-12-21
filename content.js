// Fetch the list of class names to remove from storage
chrome.storage.sync.get(["classNames"], (data) => {
    const classNames = data.classNames || []; // Default to an empty list if no class names are stored
  
    // Loop through each class name and remove matching elements
    classNames.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((element) => element.remove());
    });
  });
  