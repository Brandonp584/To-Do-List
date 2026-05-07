import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../components/Toast";
import "../styles/auth.css";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState("");
    const [loading, setLoading] = useState(false);

    const register = async () => {
        setLoading(true);

        const start = Date.now();

        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        const elapsed = Date.now() - start;
        const delay = Math.max(1000 - elapsed, 0)

        setTimeout(() => {
            setLoading(false);
        
            if (res.ok) {
                setToast("Registration successful! Redirecting...");

                setTimeout(() => {
                    navigate("/");
                }, 800);
            } else {
                (data.message || "Registration Failed!");
            }
        }, delay);
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

                <input disable={loading}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input disabled={loading}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input disabled={loading}
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

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