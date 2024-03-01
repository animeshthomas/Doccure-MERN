import { createContext, useReducer, useEffect } from "react";

const initialState = {
    user: 
        localStorage.getItem('user') !== undefined 
        ? JSON.parse(localStorage.getItem('user')) 
        : null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    isPremiumUser: localStorage.getItem('premiumstatus') || null
}

export const authContext = createContext(initialState)

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                role: null,
                token: null,
                isPremiumUser: null,
                userId: null
            }

        case "LOGIN_SUCCESS":
            // Check if the user logging in is an admin
            const isAdmin = action.payload.role === 'admin';

            return {
                user: action.payload.user,
                token: action.payload.token,
                role: isAdmin ? 'admin' : action.payload.role // Store 'admin' if user is admin
            }

        case 'LOGOUT':
            localStorage.clear();
            return {
                user: null,
                role: null,
                token: null,
                isPremiumUser: null,
                userId: null
            }

        default:
            return state;
    }
}


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
        localStorage.setItem("token", state.token)
        localStorage.setItem("role", state.role)
        localStorage.setItem("userId", state.userId)
        localStorage.setItem("premiumstatus", state.isPremiumUser)
    }, [state])

    return (
        <authContext.Provider
            value={{
                user: state.user,
                token: state.token,
                role: state.role,
                userId: state.userId,
                isPremiumUser: state.isPremiumUser,

                dispatch
            }}
        >
            {children}
        </authContext.Provider>
    )
}
