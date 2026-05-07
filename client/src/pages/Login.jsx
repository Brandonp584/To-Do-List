import { useState } from "react";
import { useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Toast from "../components/Toast";
import "../styles/auth.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const login = async () => {
    try {
        setLoading(true);

        const start = Date.now();

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        const elapsed = Date.now() - start;
        const delay = Math.max(200 - elapsed, 0);

        setTimeout(() => {
            setLoading(false);

            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("name", data.user.name);

                setToast("Login successful!");

                setTimeout(() => {
                    navigate("/tasks");
                }, 500);
            } else {
                setToast(data.message || "Login Failed!");
            }
        }, delay);
    } catch (error) {
        console.error("LOGIN ERROR:", error);
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

                <h1>Welcome Back</h1>
                <p className="subText">Login to continue</p>

                <input disabled={loading}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
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

                <button onClick={login} disabled={loading}>
                    {loading ? "Signing in..." : "Login"}
                </button>

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