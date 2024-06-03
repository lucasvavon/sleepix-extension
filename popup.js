document.getElementById('extractButton').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tabId = tabs[0].id;

        chrome.scripting.executeScript(
            {
                target: {tabId: tabId},
                files: ['content.js']
            },
            () => {
                chrome.tabs.sendMessage(tabId, {action: 'extractVideoData'}, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError.message);
                        document.getElementById('result').textContent = 'Failed to inject content script.';
                    } else if (response && response.error) {
                        document.getElementById('result').textContent = response.error;
                    } else {
                        document.getElementById('result').textContent = JSON.stringify(response, null, 2);
                    }
                });
            }
        );
    });
});
