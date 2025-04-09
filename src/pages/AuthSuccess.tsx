// pages/AuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://vibesecure-backend.onrender.com/auth/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // You can add custom headers if needed, like an app version
            // "X-App-Version": "1.0.0"
          },
          credentials: "include", // Required to send Flask session cookie
        });
        
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/submit");
        } else {
          console.error(data.error);
          navigate("/");
        }
      } catch (err) {
        console.error("Auth error:", err);
      }
    };
    fetchUser();
  }, []);
  
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const userParam = params.get("user");

//     if (userParam) {
//       try {
//         const user = JSON.parse(decodeURIComponent(userParam));
//         localStorage.setItem("user", JSON.stringify(user));
//         navigate("/scan/submit"); // or wherever you want to redirect
//       } catch (e) {
//         console.error("Invalid user data:", e);
//       }
//     } else {
//       console.warn("No user data in callback");
//       navigate("/"); // redirect home
//     }
//   }, []);

  return <p className="text-center mt-12">🔄 Logging you in...</p>;
};
