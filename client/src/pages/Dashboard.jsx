import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardCard from "../components/DashboardCard";
import MembersTable from "../components/MembersTable";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [members, setMembers] = useState([]);

  // ✅ define function FIRST
  const fetchData = async () => {
    try {
      const statsRes = await API.get("/dashboard/stats");
      const membersRes = await API.get("/dashboard/expiring");

      setStats(statsRes.data);
      setMembers(membersRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ then use it
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Gym Dashboard</h1>

      <div style={styles.cards}>
        <DashboardCard title="Total" value={stats.totalMembers || 0} />
        <DashboardCard title="Active" value={stats.activeMembers || 0} />
        <DashboardCard title="Expired" value={stats.expiredMembers || 0} />
        <DashboardCard title="Expiring" value={stats.expiringSoon || 0} />
      </div>

      {/* ✅ Correct Component Name */}
      <MembersTable members={members} />
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  cards: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
};

export default Dashboard;