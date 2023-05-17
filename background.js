// Create a context menu item
chrome.contextMenus.create({
  id: "ask-me_anything",
  title: "ask-me_anything",
  contexts: ["all"],
});


function disableAllTabs() {
  // Get all the open tabs
  chrome.tabs.query({}, function(tabs) {
    // Loop through all the tabs
    for (let i = 0; i < tabs.length; i++) {
      // Set the disabled property of the tab to true
      chrome.tabs.update(tabs[i].id, {disabled: true});
    }
  });
}


// Listen for when the user clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "ask-me_anything") {
    // Send a message to the content script
    disableAllTabs()
    chrome.tabs.sendMessage(tab.id, { type: "ask-me_anything" });
 
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'stopExtension') {
    console.log("receibed")
    chrome.management.setEnabled(chrome.runtime.id, false, function() {
      console.log('Extension disabled');
    });
  }
});
