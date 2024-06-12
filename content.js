chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractVideoData') {
        const video = document.querySelector('video');
        if (video) {
            const videoData = {
                userId: 21,
                title: 'test',
                link: location.href,
                moment: video.currentTime
            };

            sendResponse(videoData)

        } else {
            sendResponse({error: 'No video element found'});
        }
    }
});
