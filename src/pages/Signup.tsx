import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "@/api";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await authApi.signup({
        name,
        email,
        password,
      });

      alert("Account created successfully!");
      navigate("/login");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <label style={styles.label}>Name</label>
        <input
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button style={styles.button}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p style={{ color: "white", textAlign: "center", marginTop: 20 }}>
          Already have an account?
          <Link
            to="/login"
            style={{ color: "#14b8a6", marginLeft: 5 }}
          >
            Login
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
    marginBottom: 15,
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