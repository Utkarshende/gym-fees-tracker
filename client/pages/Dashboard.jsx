import React, { useEffect, useState } from 'react';
import API from '../services/api';
import DashboardCard from "./src/DashboardCard";
import Memberstable from "./src/MembersTable";



const Dashboard =()=>{
    const[stats, setStats] = useState({});
    const [members, setMembers] = useState([]);

    useEffect=(()=>{
    fetchData();    
    },[]);

const fetchData = async ()=>{
    try{
        const statsResponse = await API.get("/dashboard/stats");
        const memberResponse = await API.get("/dashboard/expiring");

        setStats(statsResponse.data);
        setMembers(memberResponse.data);
    }
    catch(error){
console.error(error);
    }
}
};

return(
    <div style={styles.container}>
        <h1>
            Gym Dashboard
            </h1>
            <div>
                <DashboardCard title="Total" value={stats.totalMembers || 0} />
                <DashboardCard title="Active " value={stats.activeMembers || 0} />
                <DashboardCard title="Expired " value={stats.expiredMembers || 0} /> 
                <DashboardCard title="Expiring Soon" value={stats.expiringSoon || 0} />
            </div>
            <h2>Expiring Members</h2>
            <Memberstable members={members}/>
        </div>
);

const style={
    container:{
        padding:"20px",
        background:"0f172a",
        minHeight:"100vh"
    },
    cards:{
        display:"flex",
gap:"20px",
marginTop:"20px"

    },
};
