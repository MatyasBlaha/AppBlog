import AuthForm from "../Components/AuthForm.jsx";
import {json, redirect} from "react-router-dom";

function AuthenticationPage() {

    return <AuthForm/>
}

export default AuthenticationPage;

export async function action({request}) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';

    if (mode !== 'login' && mode !== 'signup') {
        throw json(
            {message: 'Unsupported mode'},
            {status: 422}
        )
    }

    const data = await request.formData();
    const authData = {
        email: data.get('email'),
        password: data.get('password')
    }

    if (mode === 'signup') {
        authData.confirmPassword = data.get('confirmPassword');
        authData.profession = data.get('profession');
        authData.terms = data.get('terms');
    }


    const response = await fetch('http://localhost:8080/' + mode, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    });

    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (!response.ok) {
        throw json(
            {message: 'Authentication failed'},
            {status: 500}
        )
    }

    const resData = await response.json()
    console.log(resData)
    const token = resData.token;
    const userId = resData.userId

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId)

    return redirect('/')
}