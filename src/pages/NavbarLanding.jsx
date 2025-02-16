import "./NavbarLanding.css";
import { useNavigate } from "react-router-dom";

const NavbarLanding = () => {
    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">Slide</Link>
                </div>
            </nav>
        </>
    );
};

export default NavbarLanding;