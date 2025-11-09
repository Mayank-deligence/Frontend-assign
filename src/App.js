import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Topics from "./pages/Topics";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";

function Protected({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          localStorage.getItem("token") ? <Navigate to="/profile" replace/> : <Login/>
        } />
        <Route path="/profile" element={
          <Protected>
            <Layout><Profile/></Layout>
          </Protected>
        }/>
        <Route path="/topics" element={
          <Protected>
            <Layout><Topics/></Layout>
          </Protected>
        }/>
        <Route path="/progress" element={
          <Protected>
            <Layout><Progress/></Layout>
          </Protected>
        }/>
      </Routes>
    </Router>
  );
}

function Layout({ children }) {
  return (
    <div className="app-shell">
      <NavBar/>
      <div className="content">{children}</div>
      <footer className="footer">© 2024 Dashboard. All Rights Reserved.</footer>
    </div>
  );
}
