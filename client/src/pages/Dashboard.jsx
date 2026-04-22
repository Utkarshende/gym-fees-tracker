import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardCard from "../components/DashboardCard";
import MembersTable from "../components/MembersTable";
import AddMemberForm from "../components/AddMemberForm";
import MemberDetails from "../components/MemberDetails";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  // ✅ Fetch all data
  const fetchData = async () => {
    try {
      const statsRes = await API.get("/dashboard/stats");
      const membersRes = await API.get("/members"); // ✅ correct

      setStats(statsRes.data);
      setMembers(membersRes.data);
    } catch (error) {
      console.error("FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Gym Dashboard</h1>

      {/* ✅ Correct function passed */}
      <AddMemberForm onMemberAdded={fetchData} />

      <div style={styles.cards}>
        <DashboardCard title="Total" value={stats.totalMembers || 0} />
        <DashboardCard title="Active" value={stats.activeMembers || 0} />
        <DashboardCard title="Expired" value={stats.expiredMembers || 0} />
        <DashboardCard title="Expiring" value={stats.expiringSoon || 0} />
      </div>

      {/* ✅ Single table */}
      <MembersTable members={members} onSelect={setSelectedMember} />

      {/* ✅ Member Details Modal */}
      <MemberDetails
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
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