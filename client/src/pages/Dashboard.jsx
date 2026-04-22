import { useEffect, useState } from "react";
import API from "../services/api";
import MemberTable from "../components/members/MemberTable";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";


function Dashboard() {
   const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const fetchMembers = async () => {
    const res = await API.get("/members");
    setMembers(res.data); 
  
    useEffect(() => {
    fetchMembers();
  }, []);  
  
  }
  return (
    <div>
      <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Members</h1>

        <Button onClick={() => navigate("/add-member")}>
          + Add Member
        </Button>
      </div>

      <MemberTable
        members={members}
        onEdit={(m) => navigate(`/member/${m._id}`)}
      />
    </div>

    </div>
  )
}

export default Dashboard
