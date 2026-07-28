import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (

        <nav className="navbar">

            <h2>AI Resume Analyzer</h2>

            <div className="nav-links">

                <Link to="/dashboard">Dashboard</Link>

                <Link to="/history">My Resumes</Link>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;