import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Button from "../components/ui/Button";

function ViewMode() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);

  const fetchMember = async () => {
    try {
      const res = await API.get(`/members/${id}`);
      setMember(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load member");
    }
  };

  useEffect(() => {
    fetchMember();
  }, [id]);

  if (!member) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 font-medium"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold">
          Member Summary
        </h1>
      </div>

      {/* Summary */}
      <div className="bg-white shadow rounded-xl p-6 space-y-3">
        <p><b>Name:</b> {member.name}</p>
        <p><b>Email:</b> {member.email || "-"}</p>
        <p><b>Phone:</b> {member.phone}</p>
        <p><b>Plan:</b> {member.plan}</p>
        <p><b>Fee:</b> ₹{member.fee}</p>

        <p>
          <b>Status:</b>{" "}
          <span
            className={`font-semibold ${
              member.status === "active"
                ? "text-green-600"
                : member.status === "paused"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {member.status}
          </span>
        </p>

        <p>
          <b>Joined On:</b>{" "}
          {member.startDate
            ? new Date(member.startDate).toDateString()
            : "-"}
        </p>
      </div>

      {/* Payment History */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3">
          Payment History
        </h2>

        {member.payments?.length ? (
          member.payments.map((p, index) => (
            <div
              key={index}
              className="flex justify-between border-b py-2"
            >
              <span>₹{p.amount}</span>
              <span>
                {new Date(p.date).toDateString()}
              </span>
            </div>
          ))
        ) : (
          <p>No payment history</p>
        )}
      </div>

      {/* Edit */}
      <Button
        onClick={() =>
          navigate(`/member/edit/${id}`)
        }
      >
        Edit Member
      </Button>
    </div>
  );
}

export default ViewMode;