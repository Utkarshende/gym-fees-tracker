import Button from "../ui/Button";
import API from "../../services/api";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const PaymentCalendar = ({ member, refresh }) => {

  const handleMark = async (monthIndex) => {
    await API.put(`/members/${member._id}/pay`, {
      month: monthIndex,
      amount: member.fee
    });

    refresh();
  };

  return (
    <div>
      <h3 className="text-xl mt-6 mb-2">Payment Calendar</h3>

      <div className="grid grid-cols-4 gap-3">
        {months.map((m, i) => {
          const paid = member.payments?.some(
            (p) => new Date(p.date).getMonth() === i
          );

          return (
            <div
              key={i}
              className={`p-3 rounded-lg text-center cursor-pointer ${
                paid ? "bg-green-400" : "bg-red-400"
              }`}
              onClick={() => handleMark(i)}
            >
              {m}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentCalendar;