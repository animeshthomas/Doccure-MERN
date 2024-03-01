export const BASE_URL = "http://localhost:500/api/v1";

export const token = localStorage.getItem("token");

let userId = null; // Declare userId variable
let isPremiumUser = null; // Declare isPremiumUser variable
// Retrieve the user object from localStorage
const userString = localStorage.getItem('user');

// Check if the userString actually exists to avoid null reference errors
if (userString) {
    // Parse the string back into an object
    const userObject = JSON.parse(userString);

    // Now you can access the _id property from the userObject
    userId = userObject._id; // Assign userId
    isPremiumUser = userObject.isPremiumUser; // Assign isPremiumUser

    console.log(userId); // Use the userId as needed
} else {
    console.log('No user data found in localStorage');
}

// Export a function to get userId
export function getUserId() {
    return userId;
}

export function getIsPremiumUser() {
    return isPremiumUser;
}
