import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import MemberForm from "../components/forms/MemberForm";

function AddMember() {
  const navigate = useNavigate();

  const [member, setMember] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    height: "",
    weight: "",
    goalWeight: "",
    plan: "monthly",
    fee: "",
    category: "gym",
    status: "active",
    pause: {},
  });

  const validate = () => {
    if (member.name.trim().length < 3) {
      alert("Name must be 3 characters minimum");
      return false;
    }

    if (!/^\d{10}$/.test(member.phone)) {
      alert("Phone must be 10 digits");
      return false;
    }

    if (Number(member.fee) < 0) {
      alert("Fee invalid");
      return false;
    }

    return true;
  };

  const handleAdd = async () => {
    if (!validate()) return;

    try {
      await API.post("/members", member);

      alert("Member Added Successfully ✅");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to add member");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Add New Member
      </h1>

      <MemberForm
        member={member}
        setMember={setMember}
        onSubmit={handleAdd}
        buttonText="Add Member"
      />
    </div>
  );
}

export default AddMember;