import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div>
            <Link to="/">Login</Link>
            <Link to="/signup">Register</Link>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    );
};
export default Navbar;