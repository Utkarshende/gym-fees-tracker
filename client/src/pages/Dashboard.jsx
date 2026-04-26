// src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import MemberTable from "../components/members/MemberTable";
import Button from "../components/ui/Button";

function Dashboard() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchMembers = async () => {
    try {
      const res = await API.get("/members");
      setMembers(res.data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = members.filter((m) =>
    m.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Members Dashboard</h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search by name..."
            className="border px-4 py-2 rounded-lg w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button onClick={() => navigate("/add-member")}>
            + Add Member
          </Button>
        </div>
      </div>

      {/* Members Table */}
     <MemberTable
  members={filteredMembers}
  onView={(m) => navigate(`/member/view/${m._id}`)}
  onEdit={(m) => navigate(`/member/edit/${m._id}`)}
/>
    </div>
  );
}

export default Dashboard;