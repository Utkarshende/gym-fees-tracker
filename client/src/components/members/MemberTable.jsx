import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api.js";
import Input from "../../components/ui/Input.jsx"
import Button from "../../components/ui/Button.jsx";
import PaymentCalendar from "../../components/members/PaymentCalendar";

function MemberDetails  () {
  const { id } = useParams();
  const [member, setMember] = useState(null);

  const fetchMember = async () => {
    const res = await API.get(`/members/${id}`);
    setMember(res.data);
  };

  useEffect(() => {
    fetchMember();
  }, []);

  const handleUpdate = async () => {
    await API.put(`/members/${id}`, member);
    alert("Updated ✅");
  };

  if (!member) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Member Details</h2>

      {/* Editable Fields */}
      <Input
        value={member.name}
        onChange={(e) => setMember({ ...member, name: e.target.value })}
      />

      <Input
        value={member.phone}
        onChange={(e) => setMember({ ...member, phone: e.target.value })}
      />

      <Input
        type="number"
        value={member.fee}
        onChange={(e) => setMember({ ...member, fee: e.target.value })}
      />

      <Button onClick={handleUpdate}>Save Changes</Button>

      {/* Payment Calendar */}
      <PaymentCalendar member={member} refresh={fetchMember} />
    </div>
  );
};

export default MemberDetails;