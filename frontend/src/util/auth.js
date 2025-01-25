import {redirect} from "react-router-dom";
import {jwtDecode} from 'jwt-decode'

export function getTokenDuration(){
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

/**
 * Get user's current authorization token
 *
 * @function getAuthToken
 * @returns {string|null}
 */
export function getAuthToken(){
    const token = localStorage.getItem('token');

    if(!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    if(tokenDuration <= 0){
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        return null;
    }

    return token
}

export function tokenLoader(){
    const token = localStorage.getItem('token');
    return token
}

export function checkAuthLoader(){
    const token = tokenLoader();

    if(!token){
        return redirect('/auth');
    }

    return null
}

export function getDecodedToken(){
    const token = localStorage.getItem('token');
    if(!token){
        return null;
    }
    const decodedToken = jwtDecode(token);
    return decodedToken
}

export function getUserRole(){
    const decodedToken = getDecodedToken();
    if(!decodedToken){
        return null;
    }

    return decodedToken.role
}

/**
 * Retrieves the user ID from decoded auth token
 *
 * @function getUserId
 * @returns {string|null}
 */
export function getUserId(){
    const decodedToken = getDecodedToken();
    if(!decodedToken){
        return null;
    }

    return decodedToken.userId
}