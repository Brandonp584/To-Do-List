import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../components/Toast";
import "../styles/auth.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState("");

    const login = async () => {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.user.name);

            setToast("Login successful!");

            setTimeout(() => {
                navigate("/tasks");
            }, 700);
        } else {
            setToast(data.message || "Login Failed!");
        }
    };

    return (
        <div className="authPage">
            <div className="authCard">

                <h1>Welcome Back</h1>
                <p className="subText">Login to continue</p>

                <input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={login}>Login</button>

                <p className="switchText">
                    Don’t have an account?{" "}
                    <Link to="/register">Register</Link>
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

export default Login;