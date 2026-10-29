import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Shared form for the Login and Register pages (UI only - no real backend).
function AuthForm({ mode }) {
  const isRegister = mode === "register";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const found = {};
    if (isRegister && values.name.trim().length < 2) found.name = "Please enter your name.";
    if (!EMAIL_PATTERN.test(values.email)) found.email = "Enter a valid email address.";
    if (values.password.length < 6) found.password = "Password must be at least 6 characters.";
    if (isRegister && values.confirm !== values.password) found.confirm = "Passwords do not match.";
    return found;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const name = isRegister ? values.name.trim() : values.email.split("@")[0];
    dispatch(login({ name, email: values.email }));
    navigate("/");
  };

  return (
    <div className="auth">
      <form className="auth__card" onSubmit={handleSubmit} noValidate>
        <h1>{isRegister ? "Create your account" : "Welcome back"}</h1>
        <p className="muted">
          {isRegister ? "Join ShopSphere to save your cart and wishlist." : "Log in to continue shopping."}
        </p>

        {isRegister && (
          <label className="field">
            <span>Full name</span>
            <input name="name" className="input" value={values.name} onChange={handleChange} autoComplete="name" />
            {errors.name && <small className="field__error">{errors.name}</small>}
          </label>
        )}

        <label className="field">
          <span>Email</span>
          <input name="email" type="email" className="input" value={values.email} onChange={handleChange} autoComplete="email" />
          {errors.email && <small className="field__error">{errors.email}</small>}
        </label>

        <label className="field">
          <span>Password</span>
          <input
            name="password"
            type="password"
            className="input"
            value={values.password}
            onChange={handleChange}
            autoComplete={isRegister ? "new-password" : "current-password"}
          />
          {errors.password && <small className="field__error">{errors.password}</small>}
        </label>

        {isRegister && (
          <label className="field">
            <span>Confirm password</span>
            <input name="confirm" type="password" className="input" value={values.confirm} onChange={handleChange} autoComplete="new-password" />
            {errors.confirm && <small className="field__error">{errors.confirm}</small>}
          </label>
        )}

        <button type="submit" className="btn btn--primary btn--block btn--lg">
          {isRegister ? "Register" : "Login"}
        </button>

        <p className="auth__switch muted">
          {isRegister ? (
            <>Already have an account? <Link to="/login" className="link">Login</Link></>
          ) : (
            <>New here? <Link to="/register" className="link">Create an account</Link></>
          )}
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
