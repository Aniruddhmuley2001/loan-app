import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
        <div>
            <h2>This is Home Page</h2>
        </div>
        
        <div>
            <p>Already a user?</p>
            <button onClick={() => navigate("/user/login")}>Login</button>
        </div>

        <div>
            <p>Register to apply for loan..</p>
            <button onClick={() => navigate("/user/register")}>Register</button>
        </div>

        <div>
            <p>Login as Admin</p>
            <button onClick={() => navigate("/admin/login")}>Register</button>
        </div>
        </>
    )
}


export default Home;