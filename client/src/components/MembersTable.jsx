import React from 'react'

function MembersTable({members}) {
  return (
    <div style={{overflowX:"auto"}}>
      <table style={styles.table}>
<thead>
    <tr>
        <th>Name</th>
                <th>Phone</th>
        <th>Expiry</th>

    </tr>
</thead>

<tbody>
    {members.map((m)=>(
        <tr key={m._id}>
            <td>{m.name}</td>
                        <td>{m.phone}</td>
            <td>{new Date(m.endDate).toDateString()}</td>
        </tr>
    ))}
</tbody>
</table>
</div>
  );
};

const styles={
table:{
    width:"10px",
    minWidth:"400px",
    marginTop:"20px"
}
}

export default MembersTable;
