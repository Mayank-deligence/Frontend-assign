import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    window.dispatchEvent(new Event("storage")); // force App to update
  };

  return (
    <header className="topbar">
      <div className="brand">Dashboard</div>
      <nav className="nav">
        <NavLink to="/profile" className="navlink">Profile</NavLink>
        <NavLink to="/topics" className="navlink">Topics</NavLink>
        <NavLink to="/progress" className="navlink">Progress</NavLink>
        <button className="logout" onClick={logout}>Logout</button>
      </nav>
    </header>
  );
}
