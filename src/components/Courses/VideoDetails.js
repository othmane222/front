import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import styles from './VideoDetails.module.css';

const VideoDetails = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/videos/${id}`)
            .then(response => {
                setVideo(response.data);    
            })
            .catch(error => {
                console.error("Error fetching video details:", error);
            });
    }, [id]);

    if (!video) return <div>Loading...</div>;
    
    return (
        <div className={styles.videoDetails}>
            <h2 className={styles.videoTitle}>{video.title}</h2>
            <div className={styles.videoPlayerContainer}>
                <VideoPlayer videoSrc={video.filePath} />
                <p><strong>File Type:</strong> {video.fileType}</p>
                <p><strong>File Size:</strong> {video.fileSize} bytes</p>
                <p><strong>Upload Date:</strong> {new Date(video.uploadDate).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default VideoDetails;
