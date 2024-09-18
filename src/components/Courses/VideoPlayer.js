import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ videoSrc }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            const videoElement = videoRef.current;
            videoElement.pause();
            videoElement.src = videoSrc;
            videoElement.load();
            
            const playVideo = () => {
                videoElement.play().catch(error => {
                    console.error('Error playing video:', error);
                });
            };

            const handleLoadedData = () => {
                playVideo();
                videoElement.removeEventListener('loadeddata', handleLoadedData);
            };
            
            videoElement.addEventListener('loadeddata', handleLoadedData);

            return () => {
                videoElement.removeEventListener('loadeddata', handleLoadedData);
                videoElement.pause();
                videoElement.src = '';
            };
        }
    }, [videoSrc]);

    return (
        <div>
            <video ref={videoRef} controls width="100%">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
