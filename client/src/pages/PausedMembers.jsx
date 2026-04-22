
import { useEffect, useState } from "react";
import API from "../services/api";

function PausedMembers() {

  const [members, setMembers] = useState([]);

  useEffect(() => {
    API.get("/members/paused").then((res) => setMembers(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Paused Members</h2>

      {members.map((m) => (
        <div key={m._id} className="p-3 border mb-2 rounded">
          {m.name} — Resume on{" "}
          {new Date(m.pause?.endDate).toDateString()}
        </div>
      ))}
    </div>
  );
};

export default PausedMembers;

