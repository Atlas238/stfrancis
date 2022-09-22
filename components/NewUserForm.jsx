import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup'

export default function NewUserForm() {
    const router = useRouter()

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    })

    const formOptions = { resolver: yupResolver(validationSchema)}
    const { register, handleSubmit, setErrors, formState } = useForm(formOptions)
    const { errors } = formState
    
    async function onSubmit({ username, password }) {
        let response = await fetch('https://stfrancisone.herokuapp.com/')
        if (response.status === 200) {
            router.push('/')
        } else {
            errors.apiError.mesage = "Something went wrong, please try again"
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
                <label className="label text-neutral text-4xl">Username</label>
                <input name="username" type="text" {...register('username')} className={`form-control rounded-sm h-8 text-black ${errors.username ? 'is-invalid' : ''}`}/>
                <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
            <div className="form-control">
                <label>Password</label>
                <input name='password' type='text' {...register('password')} className={`form-control rounded-sm h-8 text-black ${errors.password ? 'is-invalid' : ""}`} />
                <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <div className="form-control mt-6">
                <button disabled={formState.isSubmitting} className="btn btn-ghost text-neutral text-3xl">
                    Create User
                </button>
                {errors.apiError && 
                    <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
                    }
            </div>
        </form>
    )
}