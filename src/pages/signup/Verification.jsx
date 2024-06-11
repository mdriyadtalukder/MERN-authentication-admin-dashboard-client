import { useEffect, useState } from "react";
import { useGetCodeQuery, useGetCurrentUserQuery, useSentMailMutation, useUpdateCodeMutation, useUpdateCurrentUserMutation, useUpdateUserMutation } from "../../RTK/features/user/userApi";
import useCurrentUser from "../../utils/useCurrentUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { LinearProgress, Stack } from "@mui/material";

const Verification = () => {
    const navigate = useNavigate();
    const { data: currentEmail } = useGetCurrentUserQuery()
    const { data: codes, isLoading: loads, error: erro } = useGetCodeQuery()

    const [data, isLoading, error, loading, err] = useCurrentUser();
    const [updateUser, { isLoading: load, error: er }] = useUpdateUserMutation();

    const [updateCurrentUser] = useUpdateCurrentUserMutation();

    const [updateCode, { isLoading: isload, error: iserr }] = useUpdateCodeMutation();
    const [otp, setOtp] = useState();

    const [sentMail, { error: mailErr }] = useSentMailMutation();


    console.log(currentEmail?.email);
    console.log(codes?.code)
    console.log(data)

    const verifyEmail = (e) => {
        e.preventDefault();


        if (data?._id && codes?.code === otp) {
            updateUser({
                id: data?._id,
                data: {
                    isEmailVerified: true,
                    isPhoneNumberVerified: true,
                }
            });

            if (codes?._id) {
                updateCode({
                    id: codes?._id,
                    data: {
                        code: '',
                    }
                });
            }

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "account verified successfully!!",
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                navigate('/login');
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

    const generateRandomCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };
    let code = generateRandomCode();

    const sentCodeAgain = () => {
        if (data?._id) {
            sentMail({
                email: data?.email,
                code: code,
            });
            if (currentEmail?._id) {
                updateCurrentUser({
                    id: currentEmail?._id,
                    data: {
                        email: data?.email,
                    }
                });
            }
            if (codes?._id) {
                updateCode({
                    id: codes?._id,
                    data: {
                        code: code,
                    }
                });
            }

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Sent code again!!",
                showConfirmButton: false,
                timer: 1500
            });

            window.location.reload();
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
                (isLoading || load || loading || isload || loads) ? <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                    <LinearProgress color="secondary" />

                </Stack> :
                    <div className="verify">


                        <form onSubmit={verifyEmail}>
                            <input
                                type="text"
                                placeholder="write code"
                                name="code"
                                required
                                onChange={(e) => setOtp(e.target.value)}

                            />

                            <button type="submit">Submit</button>
                        </form>

                        {(error || err || er || erro || iserr) && <span>Wrong Code!!</span>}
                        <p onClick={sentCodeAgain}>Sent code again!</p>
                    </div>
            }
        </>

    );
};

export default Verification;