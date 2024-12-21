document.addEventListener("DOMContentLoaded", () => {
    const classInput = document.getElementById("classInput");
    const addClassButton = document.getElementById("addClassButton");
    const classList = document.getElementById("classList");
  
    // Fetch and display existing class names
    chrome.storage.sync.get(["classNames"], (data) => {
      const classNames = data.classNames || [];
      classNames.forEach(addClassToList);
    });
  
    // Add a new class name
    addClassButton.addEventListener("click", () => {
      const className = classInput.value.trim();
      if (!className) return;
  
      chrome.storage.sync.get(["classNames"], (data) => {
        const classNames = data.classNames || [];
        if (!classNames.includes(className)) {
          classNames.push(className);
          chrome.storage.sync.set({ classNames }, () => {
            addClassToList(className);
            classInput.value = "";
          });
        }
      });
    });
  
    // Add a class name to the UI list
    function addClassToList(className) {
      const li = document.createElement("li");
      li.textContent = className;
  
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        chrome.storage.sync.get(["classNames"], (data) => {
          const classNames = data.classNames || [];
          const updatedClassNames = classNames.filter((name) => name !== className);
          chrome.storage.sync.set({ classNames: updatedClassNames }, () => {
            li.remove();
          });
        });
      });
  
      li.appendChild(removeButton);
      classList.appendChild(li);
    }
  });
  