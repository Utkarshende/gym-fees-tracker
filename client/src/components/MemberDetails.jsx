const MemberDetails = ({ member, onClose }) => {
  if (!member) return null;

  const handleRenew = async () => {
  const amount = prompt("Enter payment amount");

  await API.put(`/members/${member._id}/renew`, { amount });

  alert("Membership renewed ✅");
};

  return (
    <div style={styles.modal}>
      <h2>{member.name}</h2>
      <p>Phone: {member.phone}</p>
      <p>Plan: {member.plan}</p>
      <p>Joined: {new Date(member.startDate).toDateString()}</p>
      <p>Expiry: {new Date(member.endDate).toDateString()}</p>

      <h3>Payment History</h3>
      {member.payments?.map((p, i) => (
        <div key={i}>
          ₹{p.amount} — {new Date(p.date).toDateString()}
        </div>
      ))}

      <button onClick={onClose}>Close</button>
      <button onClick={handleRenew}>Mark as Paid / Renew</button>
    </div>
  );
};

const styles = {
  modal: {
    position: "fixed",
    top: "20%",
    left: "30%",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
  },
};

export default MemberDetails;