import {Form, Link, useSearchParams, useNavigation, useActionData} from "react-router-dom";

function AuthForm({ mode }) {
    const navigation = useNavigation()



    const [searchParams] = useSearchParams()
    const isLogin = mode === 'login';
    const isSubmitting = navigation.state === 'submitting';

    let registerContent = (
        <div>
            <p>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id='confirmPassword' name='confirmPassword' required/>
            </p>
            <p>
                <label htmlFor="name">Full name</label>
                <input type="text" id='name' name='name' required/>
            </p>
            <p>
                <label htmlFor="profession"></label>
                <select name="profession" id="profession" required>
                    <option value="">Select profession</option>
                    <option value="developer">Developer</option>
                    <option value="chef">Chef</option>
                    <option value="photographer">Photographer</option>
                    <option value="journalist">Journalist</option>
                    <option value="journalist">Student</option>
                    <option value="other">Other</option>
                </select>
            </p>
            <p>
                <label htmlFor="terms-and-conditions">
                    <input type="checkbox" id="terms-and-conditions" name="terms" required/>I
                    agree to the terms and conditions
                </label>
            </p>
        </div>
    )

    return (
        <Form method='post'>
            <p>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email' required/>
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password' required/>
            </p>

            {!isLogin && registerContent}

            <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                {isLogin ? 'New user' : 'login'}
            </Link>
            <button disabled={isSubmitting}>{isSubmitting ? 'wait...' : (isLogin ? 'login' : 'register')}</button>
        </Form>
    );
}

export default AuthForm;