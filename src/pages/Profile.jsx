import { useEffect, useState } from "react";
import API from "../api";

export default function Profile() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    API.get("/auth/me").then(r => setMe(r.data)).catch(()=>{});
  }, []);

  return (
    <div className="panel">
      <h1>Welcome {me?.email?.split("@")[0] || "Student"}</h1>
      <p>Email: {me?.email}</p>
    </div>
  );
}
