import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Register = () => {
  const { dark } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful! Please login.");
      navigate("/login"); // Redirect to login page after registration
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        dark ? "bg-background text-heading" : "bg-lightBackground text-lightHeading"
      }`}
    >
      <form
        onSubmit={handleRegister}
        className={`w-full max-w-md p-8 rounded-2xl shadow-md ${
          dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`w-full p-3 mb-4 rounded-xl border ${
            dark ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-gray-50 text-gray-900"
          }`}
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-lightCta dark:bg-cta text-white font-bold rounded-xl hover:scale-105 transition"
        >
          Register
        </button>

        <p className={`mt-4 text-sm text-center ${dark ? "text-gray-400" : "text-gray-600"}`}>
          Already have an account?{" "}
          <Link to="/login" className="text-lightCta dark:text-cta font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
