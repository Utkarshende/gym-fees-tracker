import { useState } from "react";
import API from "../services/api";

const AddMemberForm = ({ onMemberAdded }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState("monthly");
  const [fee, setFee] = useState("");

  const handleSubmit = async () => {
    // ✅ Name validation
    if (name.length < 3) {
      return alert("Name must be at least 3 characters");
    }

    // ✅ Phone validation (10 digits)
    if (!/^\d{10}$/.test(phone)) {
      return alert("Phone must be exactly 10 digits");
    }

    // ✅ Fee validation (only numbers + positive)
    if (!/^\d+$/.test(fee)) {
      return alert("Only numbers allowed in fee");
    }

    if (Number(fee) <= 0) {
      return alert("Fee must be greater than 0");
    }

    try {
      const res = await API.post("/members", {
        name,
        phone,
        plan,
        fee: Number(fee),
      });

      alert("Member added ✅");

      setName("");
      setPhone("");
      setFee("");

      onMemberAdded();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding member");
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
        placeholder="Phone (10 digits)"
        value={phone}
        maxLength={10} // ✅ limit
        onChange={(e) => {
          // allow only numbers
          if (/^\d*$/.test(e.target.value)) {
            setPhone(e.target.value);
          }
        }}
        style={styles.input}
      />

      <select value={plan} onChange={(e) => setPlan(e.target.value)} style={styles.input}>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
      </select>

      <input
        placeholder="Fee"
        value={fee}
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) {
            setFee(e.target.value);
          } else {
            alert("Only numbers allowed");
          }
        }}
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
  },
  button: {
    padding: "10px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
};

export default AddMemberForm;