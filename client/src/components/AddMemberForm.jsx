import { useState } from "react";
import API from "../services/api";

const AddMemberForm = ({ onMemberAdded }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState("monthly");
  const [fee, setFee] = useState("");

  const handleSubmit = async () => {
    if (!name || !phone || !fee) {
      return alert("Please fill all fields");
    }

    try {
      await API.post("/members", {
        name,
        phone,
        plan,
        fee,
      });

      alert("Member added ✅");

      // reset form
      setName("");
      setPhone("");
      setFee("");

      onMemberAdded(); // refresh dashboard
    } catch (err) {
      alert("Error adding member");
    }
  };

  return (
    <div style={styles.container}>
      <h3>Add Member</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={styles.input}
      />

      <select value={plan} onChange={(e) => setPlan(e.target.value)} style={styles.input}>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
      </select>

      <input
        placeholder="Fee"
        type="number"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSubmit} style={styles.button}>
        Add Member
      </button>
    </div>
  );
};

const styles = {
  container: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  input: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "8px",
    borderRadius: "6px",
    border: "none",
  },
  button: {
    padding: "10px",
    background: "#22c55e",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AddMemberForm;