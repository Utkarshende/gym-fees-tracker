import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Button from "../components/ui/Button.jsx";
import { useNavigate } from "react-router-dom";


function MemberDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [member, setMember] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    height: "",
    weight: "",
    goalWeight: "",
    fee: "",
    plan: "monthly",
    status: "active",
  });

  const fetchMember = async () => {
    try {
      const res = await API.get(`/members/${id}`);
      setMember(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) fetchMember();
  }, [id]);

  // ✅ VALIDATION
  const validate = () => {
    if (member.name.length < 3) {
      alert("Name must be at least 3 characters");
      return false;
    }

    if (!/^\d{10}$/.test(member.phone)) {
      alert("Phone must be 10 digits");
      return false;
    }

    if (member.fee < 0) {
      alert("Fee cannot be negative");
      return false;
    }

    return true;
  };
const handleUpdate = async () => {
  if (!validate()) return;

  try {
    await API.put(`/members/${id}`, member);

    alert("Updated ✅");

    navigate(-1); // 🔥 go back to previous page
  } catch (err) {
    console.error(err);
    alert("Update failed ❌");
  }
};
  if (!member) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold">Member Profile</h2>

      {/* PERSONAL INFO */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h3 className="font-semibold text-lg">Personal Information</h3>

        <input
          className="input"
          placeholder="Full Name"
          value={member.name}
          onChange={(e) =>
            setMember({ ...member, name: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Email"
          value={member.email || ""}
          onChange={(e) =>
            setMember({ ...member, email: e.target.value })
          }
        />

        <input
          className="input"
          placeholder="Phone (10 digits)"
          value={member.phone}
          onChange={(e) =>
            setMember({ ...member, phone: e.target.value })
          }
        />

        <input
          type="date"
          className="input"
          value={member.dob || ""}
          onChange={(e) =>
            setMember({ ...member, dob: e.target.value })
          }
        />

        <select
          className="input"
          value={member.gender}
          onChange={(e) =>
            setMember({ ...member, gender: e.target.value })
          }
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* FITNESS INFO */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h3 className="font-semibold text-lg">Fitness Info</h3>

        <input
          type="number"
          className="input"
          placeholder="Height (cm)"
          value={member.height}
          onChange={(e) =>
            setMember({ ...member, height: e.target.value })
          }
        />

        <input
          type="number"
          className="input"
          placeholder="Weight (kg)"
          value={member.weight}
          onChange={(e) =>
            setMember({ ...member, weight: e.target.value })
          }
        />

        <input
          type="number"
          className="input"
          placeholder="Goal Weight"
          value={member.goalWeight}
          onChange={(e) =>
            setMember({ ...member, goalWeight: e.target.value })
          }
        />
      </div>

      {/* MEMBERSHIP */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h3 className="font-semibold text-lg">Membership</h3>

        <select
          className="input"
          value={member.plan}
          onChange={(e) =>
            setMember({ ...member, plan: e.target.value })
          }
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>

        <input
          type="number"
          className="input"
          placeholder="Fee"
          value={member.fee}
          onChange={(e) =>
            setMember({ ...member, fee: Number(e.target.value) })
          }
        />

        <select
          className="input"
          value={member.status}
          onChange={(e) =>
            setMember({ ...member, status: e.target.value })
          }
        >
          <option value="active">Active</option>
          <option value="expired">Not Active</option>
          <option value="paused">On Break</option>
        </select>
      </div>

      <Button onClick={handleUpdate}>Save Changes</Button>
    </div>
  );
}

export default MemberDetails;