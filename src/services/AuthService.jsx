import axios from 'axios';
const API_URL = 'http://localhost:8080/api/users/';

const login = async (email, password) => {
    const response = await axios.post(API_URL + 'login', new URLSearchParams({ email, password }));
    if (response.data) {
        console.log("Logging in user:", response.data);
        // Save the user object in localStorage
        localStorage.setItem('user', JSON.stringify(response.data)); // Ensure role is saved
    }
    return response;
};

// Retrieve the user role from localStorage
const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.role) {
        console.warn("No user or role found in localStorage");
        return null;
    }
    console.log("Retrieved role:", user.role); // Make sure role is correct
    return user.role;
};

// Retrieve the currently logged-in user
const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        console.warn("No user found in localStorage");
        return null;
    }
    return user;
};

// Signup function
const signup = (username, email, password, role) => {
    return axios.post(API_URL + 'signup', new URLSearchParams({ username, email, password, role }));
};

const AuthService = {
    login,
    signup,
    getUserRole,
    getCurrentUser, // New function to get the current user
};

export default AuthService;
