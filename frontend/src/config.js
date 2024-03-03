export const BASE_URL = "http://localhost:500/api/v1";

export const token = localStorage.getItem('token');
let userId = null; // Initialize userId variable
let isPremiumUser = false; // Initialize isPremiumUser variable with a default value

// Retrieve the user object from localStorage
const userString = localStorage.getItem('user');

if (userString) {
    // Parse the string back into an object
    const userObject = JSON.parse(userString);

    // Ensure userObject is not null before accessing its properties
    if (userObject) {
        // Check and assign _id
        userId = userObject._id ? userObject._id : userId;
        // Check and assign isPremiumUser
        isPremiumUser = userObject.hasOwnProperty('isPremiumUser') ? userObject.isPremiumUser : isPremiumUser;
    } else {
        console.log('userObject is null');
    }
} else {
    console.log('No user data found in localStorage');
}

// Export a function to get userId
export function getUserId() {
    return userId;
}

// Export a function to get isPremiumUser status
export function getIsPremiumUser() {
    return isPremiumUser;
}
