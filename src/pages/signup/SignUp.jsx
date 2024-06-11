import axios from "axios";
import { useAddUsersMutation, useGetCodeQuery, useGetCurrentUserQuery, useGetUsersQuery, useSentMailMutation, useUpdateCodeMutation, useUpdateCurrentUserMutation } from "../../RTK/features/user/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { LinearProgress, Stack } from "@mui/material";

const image_hosting_key = 'c3b628c1be0620877686ba821b3c2092';
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const childFormRef = useRef();
    const [names, setNames] = useState('');
    const [emails, setEmails] = useState('');
    const [addUsers, { isLoading, error }] = useAddUsersMutation();

    const { data: currentEmail, isLoading: load, error: err } = useGetCurrentUserQuery() || null;
    const [updateCurrentUser, { isLoading: loading, error: er }] = useUpdateCurrentUserMutation();

    const { data: codes, isLoading: loads, error: erro } = useGetCodeQuery() || null;
    const [updateCode, { isLoading: isload, error: iserr }] = useUpdateCodeMutation();

    const { data: users, isLoading: userLoading } = useGetUsersQuery();


    const [sentMail, { error: mailErr }] = useSentMailMutation();


    const navigate = useNavigate();


    const generateRandomCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };
    let code = generateRandomCode();


    const handleSignup = async (e) => {
        e.preventDefault();

        const forms = new FormData(e.target); //ei vabeo data neye jai input field theke
        const image = forms.get('image');
        const data = new FormData();
        data.append('image', image)
        const res = await axios.post(image_hosting_api, data);

        const form = e.target;
        const name = form.name?.value;
        const email = form.email?.value;
        const password = form.password?.value;
        const number = form.number?.value;
        const photo = res?.data?.data?.display_url;

        const isAdminPresent = users?.some(user => user.email === email);

        if (!isAdminPresent && !err) {
            sentMail({
                email: email,
                code: code,
            });

            addUsers({
                name: name,
                email: email,
                image: photo,
                password: password,
                phoneNumber: number,
                isEmailVerified: false,
                isPhoneNumberVerified: false,
                role: "admin"
            });

            updateCurrentUser({
                id: currentEmail?._id,
                data: {
                    email: email,
                }
            });




            updateCode({
                id: codes?._id,
                data: {
                    code: code,
                }
            });

            e.target.reset();

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "sent a code to your mail for verifying your account!!",
                showConfirmButton: false,
                timer: 1500
            });


            setTimeout(() => {
                navigate('/verification');
            }, 0);

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





    }



    return (
        <>
            {
                (isLoading || loading || load || loads || isload || userLoading) ? <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                    <LinearProgress color="secondary" />

                </Stack> :

                    <div className="signup">


                        <form onSubmit={handleSignup}>
                            <input
                                type="text"
                                placeholder="name"
                                name="name"
                                required
                                onChange={(e) => setNames(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="email"
                                name="email"
                                required
                                onChange={(e) => setEmails(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="password"
                                name="password" required
                            />
                            <input
                                type="file"
                                name="image" required />
                            <input
                                type="text"
                                placeholder="phone number"
                                name="number" required
                            />

                            <button type="submit">Sign up</button>

                        </form>
                        {(error || err || er || iserr || erro || mailErr) && <span>Something is wrong try again</span>}
                        <Link to='/login' className='link'> <p>Already have account? Log In!</p></Link>

                    </div>
            }
        </>

    );
};

export default SignUp;