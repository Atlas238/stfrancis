import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService } from '../services/user.service';

export default Login;

function Login() {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }
    }, []);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors } = formState;

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
        <div className="hero min-h-screen bg-slate-300">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left text-black">
                    <h1 className="text-5xl font-bold">Login to Continue</h1>
                    <p className="py-6">Enter your issued username and password to sign into the main portal</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-slate-600">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className='label'>Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control text-black ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-control">
                            <label className='label'>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control text-black ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className='form-control mt-6'>
                            <button disabled={formState.isSubmitting} className="btn btn-accent">
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
