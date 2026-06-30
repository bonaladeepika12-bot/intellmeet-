import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "@/api";
import { setAccessToken } from "@/lib/http";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("demo@intellmeet.io");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await authApi.login({ email, password });
      setAccessToken(res.accessToken);
      navigate("/app");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "380px",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <h2
          style={{
            color: "#14b8a6",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          IntelliMeet Login
        </h2>

        <label style={{ color: "#ffffff" }}>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "18px",
            background: "#334155",
            color: "#ffffff",
            border: "1px solid #475569",
            borderRadius: "6px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <label style={{ color: "#ffffff" }}>Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "18px",
            background: "#334155",
            color: "#ffffff",
            border: "1px solid #475569",
            borderRadius: "6px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <p
            style={{
              color: "#ef4444",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#14b8a6",
            color: "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Link
            to="/signup"
            style={{ color: "#14b8a6", textDecoration: "none" }}
          >
            Create Account
          </Link>

          <Link
            to="/forgot-password"
            style={{ color: "#14b8a6", textDecoration: "none" }}
          >
            Forgot Password?
          </Link>
        </div>

        <div
          style={{
            marginTop: "25px",
            padding: "12px",
            background: "#334155",
            borderRadius: "6px",
            color: "#cbd5e1",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          <strong>Demo Account</strong>
          <br />
          Email: demo@intellmeet.io
          <br />
          Password: demo1234
        </div>
      </form>
    </div>
  );
}