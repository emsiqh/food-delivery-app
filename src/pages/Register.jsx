import { useState, useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

import { app } from "../firebase.config";

const RegisterPage = () => {
    const inputStyle = "w-full py-3 px-5 my-2 inline-block border-[1px] border-solid border-gray-400 rounded box-border";
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    // check if current user is authenticated, block to access the registration
    useEffect(() => {
        let authToken = sessionStorage.getItem("user");
        console.log(authToken);
        if (authToken) {
            navigate('/')
        }
    }, []);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.length === 0) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(emailRegex.test(email));
        }
    }, [email]);

    useEffect(() => {
        setPasswordsMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    const register = async () => {
        const firebaseAuth = getAuth(app);
        if (!isValidEmail) {
            alert("Email is not valid. Please re-enter");
            return;
        }
        if (!passwordsMatch) {
            alert("Passwords do not match. Please re-enter passwords.");
            return;
        }
        try {
            const response = await createUserWithEmailAndPassword(
                firebaseAuth,
                email,
                password
            );
            // console.log(response);
            alert("Registration successful, back to login page in 3s!");
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error) {
            // console.error(error);
            alert("Error creating account. Please try again.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") {
            setEmail(value);
        }
        if (name === "psw") {
            setPassword(value);
        }
        if (name === "pswRepeat") {
            setConfirmPassword(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password, confirmPassword);
        register();
    }

    return (

        <div className="w-full md:w-[300px] mb-[100px] mx-auto bg-white rounded p-5 shadow-lgShadow">
            <p className="text-center mb-5 text-4xl">Register</p>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <div className="p-4">
                    <label htmlFor="uname"><b>Email</b></label>
                    <input
                        className={`${inputStyle}`}
                        type="text"
                        name="username"
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Enter Your Email"
                    />
                    {!isValidEmail && <span className='err text-red-600'>Please enter your email correctly!<br /></span>}

                    <label htmlFor="psw"><b>Password</b></label>
                    <input
                        className={`${inputStyle}`}
                        type="password"
                        placeholder="Enter Password"
                        name="psw"
                        onChange={(e) => handleInputChange(e)}
                    />

                    <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                    <input
                        className={`${inputStyle}`}
                        type="password"
                        placeholder="Repeat Password"
                        name="pswRepeat"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {!passwordsMatch && <span className='err text-red-600'>Password doesn't match!<br /></span>}

                    <button className="bg-btnColor text-white py-[14px] px-5 my-2 border-none rounded cursor-pointer w-full" type="submit">Register</button>
                </div>
                <div className="p-4 bg-[#f1f1f1] text-center">
                    <span className="pt-4">Already have an account? <Link to={"/login"} className="underline">Sign in</Link></span>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage