import React, { useContext, useState, useEffect } from 'react';
import {auth} from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail as updateFirebaseEmail, updatePassword as updateFirebasePassword } from 'firebase/auth';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // for these functions, if you dont want to use firebase, just replace
    // creatUserWithEmail and auth.signIn to the respective function to log in
    // to your server
    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email)
    }

    // need to use a different name because it becomes a recursive funciton leading to inifinite stack
    // firebase name is the same
    function updateEmail(email) {
        return updateFirebaseEmail(auth.currentUser, email);
    }

    function updatePassword(password) {
        return updateFirebasePassword(auth.currentUser, password);
    }

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])
    
    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    }


    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
