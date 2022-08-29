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
        <div>
            <div className="navbar bg-neutral shadow-sm h-28 fixed z-50 hide">
                <img src={"./sfhlogo.png"} className="image-full h-28 fixed top-0 left-2 select-none" />
            </div>
            <div className="hero min-h-screen bg-[url('../public/sfhpries.jpg')] bg-top bg-no-repeat bg-cover bg-fixed">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-primary text-center lg:text-left">
                        <h1 className="text-6xl text-white font-bold select-none ">Login to Continue</h1>
                        <p className="py-6 text-3xl text-center text-white select-none ">Enter your issued username and password to sign into the main portal</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-md mx-5 shadow-2xl bg-accent">
                        <LoginForm /> 
                    </div>
                </div>
            </div>
        </div>
    );
}
