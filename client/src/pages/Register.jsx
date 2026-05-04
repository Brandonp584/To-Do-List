import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../components/Toast";
import "../styles/auth.css";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState("");

    const register = async () => {
        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (res.ok) {
            setToast("Registration successful! Redirecting...");

            setTimeout(() => {
                navigate("/");
            }, 800);
        } else {
            setToast(data.message || "Registration Failed!");
        }
    };

    return (
        <div className="authPage">
            <div className="authCard">

                <h1>Create Account</h1>
                <p className="subText">Sign up to get started</p>

                <input
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={register}>Register</button>

                <p className="switchText">
                    Already have an account?{" "}
                    <Link to="/">Login</Link>
                </p>

                {toast && (
                    <Toast
                        message={toast}
                        onClose={() => setToast("")}
                    />
                )}
            </div>
        </div>
    );
}

export default Register;