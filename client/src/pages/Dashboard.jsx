import React from 'react';
import { useState, useEffect } from 'react';
import API from '../services/api.js';
import DashboardCard from '../components/DashboardCard.jsx';
import MembersTable from '../components/membersTable.jsx';

function Dashboard() {
const [stats, setStats]=useState({})
;
const [members, setMembers] = useState([]);

useEffect(()=>{
    fetchData();
},[]);

const fetchdata= async ()=>{
    const statsRes = await API.get("/dashboard/stats");
const membersRes =await API.get("/dashboard/expiring");


setStats(setMembers.data);
setMembers(membersRes.data);}
return (
    <div style={StyleSheet.container}>
      <h1>Gym Dashboard</h1>
      <div>
        <DashboardCard title="Total" value={stats.totalMembers || 0} />
                <DashboardCard title="Active" value={stats.totalMembers || 0} />

        <DashboardCard title="Expired" value={stats.totalMembers || 0} />

        <DashboardCard title="Expiring" value={stats.expiringSoon || 0} />
        </div>
        <membersTable member={members}/>
    </div>
  );
};

const styles={
    container:{
        padding:"20px"
    },
    cards:{
        display:"flex",
        flexWrap:"wrap",
        gap:"10px"
    },
};

export default Dashboard;
