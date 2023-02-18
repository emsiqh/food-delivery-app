import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

import { useStateValue } from "../context/StateProvider";
import { app } from "../firebase.config";
import { actionType } from "../context/reducer";

const LoginPage = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [{ user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const loginWithGoogle = async () => {
        const {
            user: { refreshToken, providerData },
        } = await signInWithPopup(firebaseAuth, provider);
        dispatch({
            type: actionType.SET_USER,
            user: providerData[0],
        });
        localStorage.setItem("user", JSON.stringify(providerData[0]));
        sessionStorage.setItem("user", JSON.stringify(providerData[0]));
        navigate("/");
    };

    const defaultLogin = async () => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                dispatch({
                    type: actionType.SET_USER,
                    user: userCredential.user.providerData[0],
                });
                localStorage.setItem("user", JSON.stringify(userCredential.user.providerData[0]));
                sessionStorage.setItem("user", JSON.stringify(userCredential.user.providerData[0]));
                navigate("/");
            });
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        defaultLogin();
    };

    const handleGoogleLogin = (e) => {
        e.preventDefault();
        loginWithGoogle();
    };
    return (

        <div className="w-full md:w-[300px] mb-[100px] mx-auto bg-white rounded p-5 shadow-lgShadow">
            <p className="text-center mb-5 text-4xl">Login</p>
            <form action="" onSubmit={handleLogin}>
                <div className="flex justify-center mt-6 mb-3">
                    <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" className="w-[40%] rounded-[50%]" />
                </div>
                <div className="p-4">
                    <label htmlFor="uname"><b>Username</b></label>
                    <input className="w-full py-3 px-5 my-2 inline-block border-[1px] border-solid border-gray-400 rounded box-border" type="text" placeholder="Enter Username" name="uname" required onChange={handleEmailChange} />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input className="w-full py-3 px-5 my-2 inline-block border-[1px] border-solid border-gray-400 rounded box-border" type="password" placeholder="Enter Password" name="psw" required onChange={handlePasswordChange} />

                    <button className="bg-btnColor text-white py-[14px] px-5 my-2 border-none rounded cursor-pointer w-full" type="submit">Login</button>

                    <div className="flex gap-3">
                        <p className="my-2 flex items-center font-bold">Login with Google <MdArrowRight /></p>
                        <button onClick={handleGoogleLogin}><FcGoogle className="h-10 w-10" /></button>
                    </div>
                </div>

                <div className="p-4 bg-[#f1f1f1] text-center">
                    <span className="pt-4">Don't have an account? <Link to={"/register"} className="underline">Register </Link></span>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
