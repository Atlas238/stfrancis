import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup'

import { userService } from "services/user.service"

export default function LoginForm() {
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    })

    const formOptions = { resolver: yupResolver(validationSchema) };

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
    )
}