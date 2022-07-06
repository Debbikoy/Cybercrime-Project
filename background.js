chrome.tabs.onUpdated.addListener((tabId, tab) => {
    console.log("ts is")
    chrome.notifications.create("SARTED....", {
        type: "basic",
        title: "Checking Webpage",
        message: "Credibility scanner is checking the webpage for credibility.",
        priority: 2, 
        iconUrl: "icons/scan-32.png"
      } )

    if (tab.url ) {
        // console.log(document.title)
        console.log("is not logggin out")
    //   const queryParameters = tab.url.split("?")[1];
    //   const urlParameters = new URLSearchParams(queryParameters);
  
    //   chrome.tabs.sendMessage(tabId, {
    //     type: "NEW",
    //     videoId: urlParameters.get("v"),
    //   });
    }
  });