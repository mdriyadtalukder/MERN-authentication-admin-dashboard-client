import { useEffect, useState } from 'react';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetCurrentUserQuery, useGetUserQuery, useUpdateCurrentUserMutation } from '../../RTK/features/user/userApi';
import { getUser } from '../../RTK/features/user/userSlice';
import Swal from 'sweetalert2';
import { LinearProgress, Stack } from '@mui/material';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: currentUserEmail, isLoading: loading, error: err } = useGetCurrentUserQuery() || null;
    const [updateCurrentUser, { error: er }] = useUpdateCurrentUserMutation();
    const { data, error } = useGetUserQuery(email) || null;

    useEffect(() => {
        toast.success("Admin email: admin@gmail.com and password: 12345");
        
    }, []);
    const handleLogin = (e) => {
        e.preventDefault();
        if (data?.password === password && data?._id && data?.isEmailVerified) {
            dispatch(getUser(data));
            updateCurrentUser({
                id: currentUserEmail?._id,
                data: {
                    email: email,
                }
            });


            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "sent a code to your mail for verifying your account!!",
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                navigate('/');
            }, 0);
            e.target.reset();
        }
        else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something wrong try again!!",
                showConfirmButton: false,
                timer: 1500
            });
        }

    };
    //console.log(email)
    //console.log(data)
    // const handleAdd = (e) => {
    //     e.preventDefault();
    //     addUsers({
    //         name: "Zidan Chowdhury",
    //         email: "riyadtalukder67@gmail.com",
    //         image: "https://i.ibb.co/MCBNCnR/fe0096d5-31fb-4ef2-bd39-49bdfe9b5553.jpg",
    //         password: "12345",
    //         phoneNumber: "0186478589",
    //         isEmailVerified: false,
    //         isPhoneNumberVerified: false,
    //         role: "user"
    //     })
    // }

    return (
        <>
            {
                (loading) ? <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                    <LinearProgress color="secondary" />

                </Stack> :
                    <div className="login">

                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                placeholder="email" required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="password" required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Login</button>

                        </form>
                        {/* {(error || err || er) && <span>Wrong email or password!</span>}
                        <Link to='/forget' className='link'> <p>Forget password?</p></Link>
                        <Link to='/signup' className='link'> <p>Are you new? Sign Up!</p></Link> */}
                    </div>
            }
        </>
    );
};

export default Login;