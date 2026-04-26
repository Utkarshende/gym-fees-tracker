import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api.js";
import Input from "../../components/ui/Input.jsx"
import Button from "../../components/ui/Button.jsx";
import PaymentCalendar from "../../components/members/PaymentCalendar";

function MemberTable ({ members = [], onEdit ,onView}) {
  const sortedMembers = [...members].sort((a, b) =>
    (a?.name || "").localeCompare(b?.name || "")
  );

  if (!sortedMembers.length) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No members found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border rounded-lg overflow-hidden shadow-sm">
        
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Plan</th>
            <th className="p-3 text-left">Fee</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="bg-white text-black">
          {sortedMembers.map((m) => {
            // ✅ safety check
            if (!m?._id) {
              console.warn("Invalid member:", m);
              return null;
            }

            return (
              <tr key={m._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.phone || "-"}</td>
                <td className="p-3 capitalize">{m.plan}</td>
                <td className="p-3">₹{m.fee}</td>

                <td className="p-3">
  <span
    className={`px-2 py-1 rounded text-sm font-medium ${
      m.status === "active"
        ? "bg-green-100 text-green-700"
        : m.status === "paused"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {m.status === "expired" ? "Not Active" : m.status}
  </span>
</td>

                <td className="p-3">
                  <td className="p-3 flex gap-2">
  <Button onClick={() => onView(m)}>View</Button>
  <Button onClick={() => onEdit(m)}>Edit</Button>
</td>

<td className="p-3">
  {m.payments?.some((p) => {
    const now = new Date();
    const d = new Date(p.date);
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  }) ? (
    <span className="text-green-600 font-semibold">Paid</span>
  ) : (
    <span className="text-red-600 font-semibold">Pending</span>
  )}
</td>
                </td>
              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
};

export default MemberTable;