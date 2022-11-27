import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { userService } from '../services/user.service'
import LoginForm from 'components/LoginForm'

export default Login;

// Login Page - First Page a user will see if they do not already have a valid token
function Login() {
    const router = useRouter();

    useEffect(() => {
        // Wake up DB server - We dont do anything with this, just ping the server so that if it is resting our login isn't delayed
        let response = fetch('https://stfrancisone.herokuapp.com/home')
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }
    }, [router]);

    return (
        <div className="hero min-h-screen bg-neutral">
            <img src={"./sfhlogo.png"} className="image-full w-96 fixed top-0 left-0 select-none" />
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-secondary text-center lg:text-left">
                    <h1 className=" text-8xl font-bold select-none">Login to Continue</h1>
                    <p className="py-6 text-3xl text-center select-none">Enter your issued username and password to sign into the main portal test</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-md mx-5 shadow-2xl bg-accent">
                    <LoginForm /> 
                </div>
            </div>
        </div>
    );
}
