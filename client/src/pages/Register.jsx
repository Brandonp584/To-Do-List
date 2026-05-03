import { useState } from "react";
import Toast from "../components/Toast";

function Register() {
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
            setToast("Registration successful!");
        } else {
            setToast(data.message || "Registration Failed!");
        }
    };

    return (
        <div>
            <h1>Register</h1>

            <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={register}>Register</button>

            {toast && (
                <Toast
                    message={toast}
                    onClose={() => setToast("")}
                />
            )}
            
        </div>
    );
}

export default Register;