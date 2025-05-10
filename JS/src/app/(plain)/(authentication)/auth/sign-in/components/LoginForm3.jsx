import { useState } from "react";
import api from '../../../../../api/route';
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from "../../../../../../constants";

function LoginForm3() {
    const method = "login";
    const route = "/api/token/";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = "Login";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            console.log("email", email)
            console.log("password", password)
            console.log("route", route)
            console.log("method", method)
            const res = await api.post(route, { email, password })
            console.log(res)
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                localStorage.setItem(USER_ID, res.data.user_id);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <>loading</>}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default LoginForm3