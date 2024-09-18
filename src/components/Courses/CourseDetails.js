import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import Modal from './Modal';
import { FaFilePdf } from 'react-icons/fa';
import styles from './CourseDetails.module.css';


const CourseDetails = () => {
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isDetailsVisible, setIsDetailsVisible] = useState(true);
    const [isVideoListVisible, setIsVideoListVisible] = useState(true);
    const [activeTab, setActiveTab] = useState('details');
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [qcms, setQcms] = useState([]);
    const [answers, setAnswers] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedbackData, setFeedbackData] = useState([]);
    const [currentGrade, setCurrentGrade] = useState(null);

    const userId = JSON.parse(localStorage.getItem('educationalPlatform')).id;


    useEffect(() => {
        axios.get(`http://localhost:8080/api/courses/${id}`)
            .then(response => {
                setCourse(response.data);
                if (response.data.videos.length > 0) {
                    setSelectedVideo(response.data.videos[0]);
                }
            })
            .catch(error => {
                console.error("Error fetching course details:", error);
            });
    }, [id]);

    useEffect(() => {
        if (course && course.videos.length > 0) {
            setSelectedVideo(course.videos[0]);
        }
    }, [course]);

    useEffect(() => {
        if (course) {
            axios.get(`http://localhost:8080/api/quizzes`)
                .then(response => setQuizzes(response.data))
                .catch(error => console.error("Error fetching quizzes:", error));
        }
    }, [course]);

    useEffect(() => {
        if (selectedQuizId !== null) {
            axios.get(`http://localhost:8080/api/qcm/quiz/${selectedQuizId}`)
                .then(response => setQcms(response.data))
                .catch(error => console.error("Error fetching QCMs:", error));
        }
    }, [selectedQuizId]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/grades/student/${userId}/quiz/${selectedQuizId}`)
            .then(response => {
                setCurrentGrade(response.data.value);
            })
            .catch(error => console.error("Error fetching updated grade:", error));
    }, [userId, selectedQuizId])

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const toggleDetails = () => {
        setIsDetailsVisible(prev => !prev);
    };

    const toggleVideoList = () => {
        setIsVideoListVisible(prev => !prev);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleQuizSelect = (quizId) => {
        setSelectedQuizId(quizId);
        setIsModalOpen(true);
    };

    const handleAnswerChange = (qcmId, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [qcmId]: value
        }));
    };

    const handleSubmitAnswers = () => {
        const feedback = [];
        const correctAnswers = [];

        Promise.all(Object.keys(answers).map(qcmId =>
            axios.post(`http://localhost:8080/api/qcm/check/${qcmId}`, { answer: answers[qcmId], studentId: userId })
        ))
            .then(responses => {
                responses.forEach((response, index) => {
                    const qcmId = Object.keys(answers)[index];
                    const isCorrect = response.data.correct;
                    feedback.push({
                        qcmId,
                        message: response.data.message,
                        isCorrect
                    });

                    if (isCorrect) {
                        correctAnswers.push(qcmId);
                    }
                });
                console.log("***************************************************")
                console.log(`Correct answer count is : ${correctAnswers.length}`)
                console.log(feedback)
                console.log("***************************************************")
                axios.patch(`http://localhost:8080/api/grades/${userId}`, {
                    studentId: userId,
                    quizId: selectedQuizId,
                    value: correctAnswers.length
                })
                    .then(() => {
                        axios.get(`http://localhost:8080/api/grades/student/${userId}/quiz/${selectedQuizId}`)
                            .then(response => {
                                setCurrentGrade(response.data.value);
                                setFeedbackData(feedback);
                                setIsModalOpen(true);
                            })
                            .catch(error => console.error("Error fetching updated grade:", error));
                    })
                    .catch(error => console.error("Error updating grades:", error));
            })
            .catch(error => console.error("Error submitting answers:", error));
    };

    const closeModal = () => {
        setFeedbackData([])
        setAnswers({})
        setIsModalOpen(false);
    };

    if (!course) return <div>Loading...</div>;

    return (
        <div className={styles.courseDetails}>
            <div className={styles.mainContent}>
                <div className={`${styles.videoPlayerContainer} ${!isVideoListVisible ? styles.fullWidth : ''}`}>
                    {selectedVideo && (
                        <VideoPlayer
                            videoSrc={`http://localhost:8080/api/videos/stream?fileName=${encodeURIComponent(selectedVideo.filePath)}`}
                        />
                    )}
                </div>
                {!isVideoListVisible && (
                    <div
                        className={styles.showArrow}
                        onClick={toggleVideoList}
                    >
                        <span className={styles.arrow}>&#9664;</span>
                        <span className={styles.arrowText}>Course Content</span>
                    </div>
                )}
                <div className={styles.detailsContainer}>
                    <button className={styles.toggleButton} onClick={toggleDetails}>
                        {isDetailsVisible ? 'Hide Details' : 'Show Details'}
                    </button>
                    {isDetailsVisible && (
                        <>
                            <div className={styles.tabs}>
                                <button
                                    className={`${styles.tab} ${activeTab === 'details' ? styles.activeTab : ''}`}
                                    onClick={() => handleTabChange('details')}
                                >
                                    Course Details
                                </button>
                                <button
                                    className={`${styles.tab} ${activeTab === 'quizzes' ? styles.activeTab : ''}`}
                                    onClick={() => handleTabChange('quizzes')}
                                >
                                    Quizzes
                                </button>
                            </div>
                            <div className={styles.tabContent}>
                                {activeTab === 'details' && (
                                    <div>
                                        <h2>Course Details</h2>
                                        <p><strong>Teacher:</strong> {course.teacher.username}</p>
                                        <p><strong>Title:</strong> {course.title}</p>
                                        <p><strong>Description:</strong> {course.description}</p>
                                        <p><strong>Category:</strong> {course.category?.name}</p>
                                        <a
                                            href={`http://localhost:8080/api/courses/${course.id}/download-pdf`}
                                            download
                                            className={styles.downloadLink}
                                        >
                                            <FaFilePdf className={styles.pdfIcon} />
                                            {course.pdfName}
                                        </a>
                                    </div>
                                )}
                                {activeTab === 'assignments' && (
                                    <div>
                                        <h2>Assignments</h2>
                                        <ul>
                                            {course.assignments.map(assignment => (
                                                <li key={assignment.id}>{assignment.title}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {activeTab === 'quizzes' && (
                                    <div>
                                        <h2>Quizzes</h2>
                                        <ul>
                                            {quizzes.map(quiz => (
                                                <li key={quiz.id}>
                                                    <button onClick={() => handleQuizSelect(quiz.id)}>
                                                        {quiz.title}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
            {isVideoListVisible && (
                <div className={styles.videoListContainer}>
                    <button className={styles.toggleButton} onClick={toggleVideoList}>
                        Hide Course Content
                    </button>
                    <div>
                        <h3 className={styles.videoListHeader}>Course Content</h3>
                        <ul className={styles.videoList}>
                            {course.videos && course.videos.length > 0 ? (
                                course.videos.map(video => (
                                    <li
                                        key={video.id}
                                        className={`${styles.videoItem} ${selectedVideo?.id === video.id ? styles.selected : ''}`}
                                        onClick={() => handleVideoClick(video)}
                                    >
                                        {video.title}
                                    </li>
                                ))
                            ) : (
                                <div>No videos available for this course.</div>
                            )}
                        </ul>
                    </div>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={`Question for: ${(quizzes.filter(quiz => quiz.id === selectedQuizId)[0] === undefined ?
                    selectedQuizId : quizzes.filter(quiz => quiz.id === selectedQuizId)[0].title)}`}
            >
                <ul className={styles.questions}>
                    {qcms.map(qcm => (
                        <li key={qcm.id}>
                            <p>{qcm.question}</p>
                            <input
                                required={true}
                                type="text"
                                onChange={(e) => handleAnswerChange(qcm.id, e.target.value)}
                            />
                        </li>
                    ))}
                </ul>
                <div>
                    <h4>Your Current Grade: {currentGrade}</h4>
                </div>
                <ul>
                    {feedbackData.map(feedback => (
                        <li key={feedback.qcmId}>
                            <p>
                                {feedback.isCorrect ? (
                                    <span style={{ color: 'green' }}>Correct</span>
                                ) : (
                                    <span style={{ color: 'red' }}>Incorrect</span>
                                )}
                            </p>
                            { }
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleSubmitAnswers}
                    disabled={feedbackData.length > 0}
                    className={feedbackData.length <= 0 ? (styles.submitButton) : (styles.submitButtonDisabled)}
                >
                    Submit Answers
                </button>
            </Modal>

        </div>
    );
};

export default CourseDetails;
