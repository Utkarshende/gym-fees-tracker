const MembersTable = ({ members, onSelect }) => {
  if (!members.length) {
    return <p>No members found</p>;
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Expiry</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {members.map((m) => (
          <tr key={m._id} onClick={() => onSelect(m)} style={styles.row}>
            <td>{m.name}</td>
            <td>{m.phone}</td>
            <td>{new Date(m.endDate).toDateString()}</td>
            <td>{m.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  table: { width: "100%", marginTop: "20px" },
  row: { cursor: "pointer" },
};

export default MembersTable;