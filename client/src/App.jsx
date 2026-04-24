import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddMember from "./pages/AddMember";
import Login from "./pages/Login";
import MemberDetails from './components/MemberDetails.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/login" element={<Login />} />
        <Route path="/member/:id" element={<MemberDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;