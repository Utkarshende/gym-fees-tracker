import { useState } from "react";
import API from "../services/api";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

function AddMember() 
    {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await API.post("/members", form);
    navigate("/");
  };
  return (
         <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl mb-4">Add Member</h2>

      <Input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <Input placeholder="Fee" type="number" onChange={(e) => setForm({ ...form, fee: e.target.value })} />

      <Button onClick={handleSubmit} className="mt-4 w-full">
        Save
      </Button>
    </div>
  );
};
      


export default AddMember
