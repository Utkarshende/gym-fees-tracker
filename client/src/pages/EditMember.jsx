import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import MemberForm from "../components/forms/MemberForm";

function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);

  const fetchMember = async () => {
    try {
      const res = await API.get(`/members/${id}`);
      setMember(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMember();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await API.put(`/members/${id}`, member);

      alert("Updated Successfully ✅");

      navigate(`/member/view/${id}`);
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  if (!member) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Member
      </h1>

      <MemberForm
        member={member}
        setMember={setMember}
        onSubmit={handleUpdate}
        buttonText="Save Changes"
      />
    </div>
  );
}

export default EditMember;