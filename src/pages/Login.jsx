import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const { dark } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout successful!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        dark ? "bg-background text-heading" : "bg-lightBackground text-lightHeading"
      }`}
    >
      <form
        onSubmit={handleLogin}
        className={`w-full max-w-md p-8 rounded-2xl shadow-md ${
          dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-3 mb-4 rounded-xl border ${
            dark ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-gray-50 text-gray-900"
          }`}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-3 mb-4 rounded-xl border ${
            dark ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-gray-50 text-gray-900"
          }`}
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-lightCta dark:bg-cta text-white font-bold rounded-xl hover:scale-105 transition"
        >
          Login
        </button>

        <p className={`mt-4 text-sm text-center ${dark ? "text-gray-400" : "text-gray-600"}`}>
          Don't have an account?{" "}
          <Link to="/register" className="text-lightCta dark:text-cta font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
