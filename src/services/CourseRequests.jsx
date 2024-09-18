import axios from 'axios';


axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';

export const getAllSubscribedCourses = (id) => {
    return axios.get(CourseRequests.listSubscriptionUrl(id));
};

export const subscribeToCourse = (userId, courseId) => {
    return axios.post(`${CourseRequests.subscribeURL()}?userId=${userId}&courseId=${courseId}`, {courseId});
}

const CourseRequests = {
    BASE_URL:  'http://localhost:8080/api/',
    USERS : 'users',
    COURSES : 'courses',
    CATEGORIES : 'categories',
    subscribe : "subscription/subscribe",
    unSubscribe : "subscription/unsubscribe",



    listSubscriptionUrl : (id) => { return `${CourseRequests.BASE_URL}/subscription/user/${id}/courses`},
    subscribeURL : () => { return `${CourseRequests.BASE_URL}${CourseRequests.subscribe}`},
    unSubscribeURL : () => { return `${CourseRequests.BASE_URL}${CourseRequests.unSubscribe}`},


    getAllSubscribedCourses,
    subscribeToCourse
};

export default CourseRequests;
