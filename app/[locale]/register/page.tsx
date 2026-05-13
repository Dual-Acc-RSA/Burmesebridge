export default function RegisterPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          padding: "32px",
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "24px" }}>
          Register
        </h1>

        <input
          type="text"
          placeholder="Display Name"
          style={input}
        />

        <input
          type="email"
          placeholder="Email"
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          style={input}
        />

        <button style={button}>Create Account</button>

        <a
          href="/my/login"
          style={{
            display: "block",
            marginTop: "18px",
            textAlign: "center",
            color: "#2563eb",
            fontWeight: 700,
          }}
        >
          Already have an account? Login
        </a>
      </div>
    </main>
  );
}

const input = {
  width: "100%",
  padding: "14px",
  marginBottom: "16px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
};

const button = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#10b981",
  color: "white",
  fontWeight: 700,
};