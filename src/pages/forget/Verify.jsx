import { useNavigate } from "react-router-dom";
import { useGetCodeQuery, useSentMailMutation, useUpdateCodeMutation } from "../../RTK/features/user/userApi";
import useCurrentUser from "../../utils/useCurrentUser";
import { useState } from "react";
import Swal from "sweetalert2";
import { LinearProgress, Stack } from "@mui/material";

const Verify = () => {
    const navigate = useNavigate();
    const { data: codes, isLoading: loads, error: erro } = useGetCodeQuery()

    const [data, isLoading, error, loading, err] = useCurrentUser();


    const [updateCode, { isLoading: isload, error: iserr }] = useUpdateCodeMutation();
    const [otp, setOtp] = useState();

    const [sentMail] = useSentMailMutation();


    console.log(codes)
    console.log(data)

    const verifyEmail = (e) => {
        e.preventDefault();


        if (data?._id && codes?.code === otp) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully submitted!!",
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                navigate('/changepass');
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
                (isLoading || loading || isload || loads) ? <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="secondary" />
            
            </Stack> :
                    <div className="verified">


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

                        {(error || err || erro || iserr) && <span>Wrong Code!!</span>}
                        <p onClick={sentCodeAgain}>Sent code again!</p>
                    </div>
            }
        </>

    );
};

export default Verify;