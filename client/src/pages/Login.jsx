import { useState } from "react";
import {useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

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
            
            setToast("Login successful!");

            setTimeout(() => {
                navigate("/tasks");
            }, 800);
        } else {
            setToast(data.message || "Login Failed!");
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={login}>Login</button>

            {toast && (
                <Toast
                    message={toast}
                    onClose={() => setToast("")}
                />
            )}
        </div>
    );
}

export default Login;