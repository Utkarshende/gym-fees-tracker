import { useEffect, useState } from "react";
import API from "../services/api";
import MemberTable from "../components/members/MemberTable";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const fetchMembers = async () => {
    try {
      const res = await API.get("/members");
      console.log("MEMBERS DATA:", res.data); // ✅ debug
      setMembers(res.data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };
  useEffect(() => {
    fetchMembers();
  }, []);

const filteredMembers = members.filter((m) =>
  m.name.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Members</h1>
        <input
  type="text"
  placeholder="Search by name..."
  className="border px-3 py-2 rounded w-64"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

        <Button onClick={() => navigate("/add-member")}>
          + Add Member
        </Button>
      </div>

      <MemberTable
        members={members}
        onEdit={(m) => {
          console.log("CLICKED MEMBER:", m); // ✅ debug
          navigate(`/member/${m._id}`);
        }}
      />
      <MemberTable
  members={filteredMembers}
  onEdit={(m) => navigate(`/member/${m._id}`)}
/>
    </div>
  );
}

export default Dashboard;