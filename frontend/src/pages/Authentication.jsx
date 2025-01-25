import AuthForm from "../Components/AuthForm.jsx";
import {json, redirect, useSearchParams} from "react-router-dom";
import {apiClient} from "../util/apiCalls.js";

function AuthenticationPage() {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'login';

    return <AuthForm mode={mode} />;

}

export default AuthenticationPage;

export async function action({ request }) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';

    if (mode !== 'login' && mode !== 'signup') {
        return json(
            { message: 'Unsupported mode' },
            { status: 422 }
        );
    }

    const data = await request.formData();
    const authData = {
        email: data.get('email'),
        password: data.get('password'),
    };

    if (mode === 'signup') {
        authData.confirmPassword = data.get('confirmPassword');
        authData.name = data.get('name');
        authData.profession = data.get('profession');
        authData.terms = data.get('terms');
    }

    const response = await apiClient(`/auth/${mode}`, {
        method: 'POST',
        body: JSON.stringify(authData),
    });

    if (!response.success) {
        return json(
            { message: response.error },
            { status: 400 }
        );
    }

    if(mode === 'login') {
        const token = response.data.token;

        localStorage.setItem('token', token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 6);
        localStorage.setItem('expiration', expiration.toISOString());

        return redirect('/');
    } else {
        return redirect('/auth?mode=login');
    }

}