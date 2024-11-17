import {redirect} from "react-router-dom";


export function getAuthToken(){
    const token = localStorage.getItem('token');

    if(!token) {
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