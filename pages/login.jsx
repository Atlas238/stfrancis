import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService } from '../services/user.service';

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

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors } = formState;

    // Tries to auth a user, if it fails print errors 
    function onSubmit({ username, password }) {
        return userService.login(username, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            .catch(error => {
                setError('apiError', { message: error.message || error });
            });
    }
    return (
        <div className="hero min-h-screen bg-neutral">
            <img src={"./sfhlogo.png"} className="image-full w-96 fixed top-0 left-0 select-none" />
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-secondary text-center lg:text-left">
                    <h1 className=" text-8xl font-bold select-none">Login to Continue</h1>
                    <p className="py-6 text-3xl text-center select-none">Enter your issued username and password to sign into the main portal</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-md mx-5 shadow-2xl bg-accent">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className='label text-neutral text-4xl'>Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control rounded-sm h-8 text-black ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-control">
                            <label className='label text-neutral text-4xl'>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control rounded-sm h-8 text-black ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className='form-control mt-6'>
                            <button disabled={formState.isSubmitting} className="btn btn-ghost text-neutral text-3xl">
                                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Login
                            </button>
                            {errors.apiError &&
                                <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
