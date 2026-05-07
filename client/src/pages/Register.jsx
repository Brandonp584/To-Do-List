import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Toast from "../components/Toast";
import "../styles/auth.css";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const register = async () => {
        try {
            setLoading(true);

            console.log("API URL:", import.meta.env.VITE_API_URL);

            const start = Date.now();

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            console.log("REGISTER STATUS:", res.status);
            console.log("REGISTER DATA:", data);

            const elapsed = Date.now() - start;
            const delay = Math.max(200 - elapsed, 0);

            setTimeout(() => {
                setLoading(false);

                if (res.ok) {
                    setToast("Registration successful! Redirecting...");

                    setTimeout(() => {
                        navigate("/");
                    }, 500);
                } else {
                    setToast(data.message || "Registration Failed!");
                 }
            }, delay);
        } catch (error) {
            console.error("REGISTER ERROR:", error);
            setLoading(false);
            setToast("Server connection failed");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/tasks");
        }
    }, [navigate]);

    return (
        <div className="authPage">
            <div className="authCard">

                <h1>Create Account</h1>
                <p className="subText">Sign up to get started</p>

                <input 
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                />

                <input 
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />

                <div className="passwordWrapper">
                    <input 
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />

                    <button 
                        type="button"
                        className="passwordToggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>

                <button onClick={register} disabled={loading}>
                    {loading ? "Creating Account..." : "Register"}
                </button>

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