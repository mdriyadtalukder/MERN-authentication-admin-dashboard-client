import Swal from "sweetalert2";
import { useGetCodeQuery, useGetCurrentUserQuery, useGetUsersQuery, useSentMailMutation, useUpdateCodeMutation, useUpdateCurrentUserMutation } from "../../RTK/features/user/userApi";
import { useNavigate } from "react-router-dom";
import { LinearProgress, Stack } from "@mui/material";

const ForgetPass = () => {
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

    const handleForget = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email?.value;
        console.log(email)
        const isAdminPresent = users?.some(user => user.email === email);

        if (isAdminPresent) {

            sentMail({
                email: email,
                code: code,
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

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "sent a code to your mail for verifying!!",
                showConfirmButton: false,
                timer: 1500
            });


            setTimeout(() => {
                navigate('/verify');
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
            {(loading || load || loads || isload || userLoading) ? <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
    <LinearProgress color="secondary" />

</Stack> :
                <div className="forget">

                    <form onSubmit={handleForget}>
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            required

                        />
                        <button type="submit">Submit</button>

                    </form>
                    {(err || er || iserr || erro || mailErr) && <span>Something is wrong try again</span>}

                </div>}
        </>

    );
};

export default ForgetPass;