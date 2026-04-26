import Button from "../ui/Button";

function MemberForm({
  member,
  setMember,
  onSubmit,
  buttonText = "Submit",
}) {
  const handlePhone = (value) => {
    const clean = value.replace(/\D/g, "").slice(0, 10);

    setMember({
      ...member,
      phone: clean,
    });
  };

  const handleFee = (value) => {
    setMember({
      ...member,
      fee: Math.max(0, Number(value)),
    });
  };

  return (
    <div className="space-y-6">

      {/* PERSONAL INFO */}
      <div className="bg-white shadow rounded-xl p-6 grid md:grid-cols-2 gap-4">
        <h2 className="col-span-full text-xl font-bold">
          Personal Information
        </h2>

        <input
          className="border p-3 rounded"
          placeholder="Full Name"
          value={member.name}
          onChange={(e) =>
            setMember({
              ...member,
              name: e.target.value,
            })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Email"
          value={member.email}
          onChange={(e) =>
            setMember({
              ...member,
              email: e.target.value,
            })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Phone Number"
          value={member.phone}
          onChange={(e) =>
            handlePhone(e.target.value)
          }
        />

        <input
          type="date"
          className="border p-3 rounded"
          value={member.dob}
          onChange={(e) =>
            setMember({
              ...member,
              dob: e.target.value,
            })
          }
        />

        <select
          className="border p-3 rounded"
          value={member.gender}
          onChange={(e) =>
            setMember({
              ...member,
              gender: e.target.value,
            })
          }
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          className="border p-3 rounded"
          placeholder="Address"
          value={member.address}
          onChange={(e) =>
            setMember({
              ...member,
              address: e.target.value,
            })
          }
        />
      </div>

      {/* FITNESS */}
      <div className="bg-white shadow rounded-xl p-6 grid md:grid-cols-3 gap-4">
        <h2 className="col-span-full text-xl font-bold">
          Fitness Info
        </h2>

        <input
          type="number"
          className="border p-3 rounded"
          placeholder="Height (cm)"
          value={member.height}
          onChange={(e) =>
            setMember({
              ...member,
              height: e.target.value,
            })
          }
        />

        <input
          type="number"
          className="border p-3 rounded"
          placeholder="Weight (kg)"
          value={member.weight}
          onChange={(e) =>
            setMember({
              ...member,
              weight: e.target.value,
            })
          }
        />

        <input
          type="number"
          className="border p-3 rounded"
          placeholder="Goal Weight"
          value={member.goalWeight}
          onChange={(e) =>
            setMember({
              ...member,
              goalWeight: e.target.value,
            })
          }
        />
      </div>

      {/* MEMBERSHIP */}
      <div className="bg-white shadow rounded-xl p-6 grid md:grid-cols-2 gap-4">
        <h2 className="col-span-full text-xl font-bold">
          Membership
        </h2>

        <select
          className="border p-3 rounded"
          value={member.plan}
          onChange={(e) =>
            setMember({
              ...member,
              plan: e.target.value,
            })
          }
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>

        <input
          type="number"
          className="border p-3 rounded"
          placeholder="Fees"
          value={member.fee}
          onChange={(e) =>
            handleFee(e.target.value)
          }
        />

        <select
          className="border p-3 rounded"
          value={member.category}
          onChange={(e) =>
            setMember({
              ...member,
              category: e.target.value,
            })
          }
        >
          <option value="gym">Gym</option>
          <option value="gym+cardio">
            Gym + Cardio
          </option>
        </select>

        <select
          className="border p-3 rounded"
          value={member.status}
          onChange={(e) =>
            setMember({
              ...member,
              status: e.target.value,
            })
          }
        >
          <option value="active">Active</option>
          <option value="expired">
            Not Active
          </option>
          <option value="paused">
            On Break
          </option>
        </select>
      </div>

      {/* BREAK SECTION */}
      {member.status === "paused" && (
        <div className="bg-white shadow rounded-xl p-6 grid md:grid-cols-2 gap-4">
          <h2 className="col-span-full text-xl font-bold">
            Break Details
          </h2>

          <input
            className="border p-3 rounded"
            placeholder="Reason"
            value={member.pause?.reason || ""}
            onChange={(e) =>
              setMember({
                ...member,
                pause: {
                  ...member.pause,
                  reason: e.target.value,
                },
              })
            }
          />

          <input
            type="date"
            className="border p-3 rounded"
            value={member.pause?.startDate || ""}
            onChange={(e) =>
              setMember({
                ...member,
                pause: {
                  ...member.pause,
                  startDate: e.target.value,
                },
              })
            }
          />

          <input
            type="date"
            className="border p-3 rounded"
            value={member.pause?.endDate || ""}
            onChange={(e) =>
              setMember({
                ...member,
                pause: {
                  ...member.pause,
                  endDate: e.target.value,
                },
              })
            }
          />
        </div>
      )}

      {/* SUBMIT */}
      <Button onClick={onSubmit}>
        {buttonText}
      </Button>
    </div>
  );
}

export default MemberForm;