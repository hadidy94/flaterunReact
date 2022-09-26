import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authSelector, clearState } from '../store/authSlice';
import { phoneAttemp } from '../store/authActions';
import toast, { Toaster } from 'react-hot-toast';



const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { isFetching, isSuccess, isError, errorMessage } = useSelector(
        authSelector
    );
    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            navigate('/otp');
        }

        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }
    }, [isSuccess, isError]);


    const onSubmit = (data) => {
        data.deviceId = 'website-portal';
        dispatch(phoneAttemp(data));
    }

    return (
        <Fragment>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-floating mb-3">
                        <input type="tel" className="form-control" id="floatingInput" {...register("username", { required: true })} />
                        <label htmlFor="floatingInput">Phone Number or user name</label>
                        {errors.username && <span className="">This field is required</span>}
                    </div>

                    <input className="btn btn-primary w-100" type="submit" />
                </form>
                <Toaster />
            </div>
        </Fragment>
    );
}
export default Login;