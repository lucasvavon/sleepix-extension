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

                        fetch("http://localhost:8080/api/videos", {
                            method: "post",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },

                            body: JSON.stringify(response)
                        })
                            .then((res) => {
                                console.log(res);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                });
            }
        );
    });
});
document.addEventListener("DOMContentLoaded", async function () {
    const videos = await getUserVideos(21)
    videos.forEach(video => {
        document.getElementById('result').innerHTML += videoCard(video.Title, video.Link, video.Moment);
    })
});

function videoCard(title, link, moment) {
    return `<a href="${link}&t=${moment}" class="video-card">
                <img src="https://www.numerama.com/wp-content/uploads/2017/11/macos-high-sierra.jpg" alt="Video Thumbnail">
                <div class="play-button">&#x25B6;</div>
                <div class="title">${title}</div>
              </a>`;
}

async function getUserVideos(id) {
    const response = await fetch(`http://localhost:8080/api/videos/user/${id}`)
    return await response.json();
}
