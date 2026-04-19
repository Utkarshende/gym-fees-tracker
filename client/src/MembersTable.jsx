const MemberTable = ({members})=>{
    return(
        <table style={style.table}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>End Date</th>
                </tr>
                </thead>
                <tbody>
                    {members.map((member)=>(
                        <tr>
                            <td>{member._id}</td>
                               <td>{member.name}</td>
                            <td>{member.phone}</td>
                            <td>{new Date (member.endDate).toDateString()}</td>
                        </tr>
                    ))}
                                            </tbody>

        </table>
    );
};

const style = {
    table:{
width:"100%",   
marginTop:"20px",
borderCollapse:"collapse",
color:"#fff",
    }
}