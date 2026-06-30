import { useState } from "react";
import { Link } from "react-router-dom";
import { authApi } from "@/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await authApi.forgotPassword({ email });
      setMessage(res.message);
    } catch {
      setMessage("Unable to send reset email.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>

        <label style={styles.label}>Email</label>

        <input
          style={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button style={styles.button}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && (
          <p
            style={{
              color: "#14b8a6",
              marginTop: 15,
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ textAlign: "center", marginTop: 20 }}>
          <Link
            to="/login"
            style={{ color: "#14b8a6" }}
          >
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles: any = {
  container: {
    background: "#0f172a",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 380,
    background: "#1e293b",
    padding: 30,
    borderRadius: 10,
  },
  title: {
    color: "#14b8a6",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "white",
  },
  input: {
    width: "100%",
    padding: 12,
    marginTop: 8,
    marginBottom: 20,
    background: "#334155",
    color: "white",
    border: "1px solid #475569",
    borderRadius: 6,
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#14b8a6",
    border: "none",
    borderRadius: 6,
    fontWeight: "bold",
    cursor: "pointer",
  },
};