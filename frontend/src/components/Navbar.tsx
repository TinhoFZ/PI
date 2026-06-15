import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <nav>
            <Link to="/dashboard">
                Dashboard
            </Link>

            {" | "}

            <Link to="/zones">
                Zonas
            </Link>

            {" | "}

            <Link to="/treasures">
                Tesouros
            </Link>

            {" | "}

            <Link to="/quests">
                Quests
            </Link>

            {" | "}

            <Link to="/map">
                Mapa
            </Link>

            {" | "}

            <button onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
}