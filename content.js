chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractVideoData') {
        const video = document.querySelector('video');
        if (video) {
            const videoData = {
                currentTime: video.currentTime,
                duration: video.duration,
                paused: video.paused,
                volume: video.volume,
                playbackRate: video.playbackRate,
                src: location.href
            };
            sendResponse(videoData);
        } else {
            sendResponse({ error: 'No video element found' });
        }
    }
});
