(function() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action == "get_snippets"){
        res = [];
        snippets = document.querySelectorAll(".post-text pre code");
        [].forEach.call(snippets, (snippet) => {
          let language = snippet.parentNode.className.split(' ')[0]
          if (language == "default"){
            language = "language-javascript";
          }
          res.push({
            code: snippet.textContent,
            language: language
          });
        })
        sendResponse({snippets: res});
      }
    });
}());