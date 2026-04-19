import Member from "../models/Member.js";

//adding memberr

export const addMember = async (req,res) => {
try{
const member = await Member.create(req.body);
res.status(201).json(member);
}
catch(error){
    res.status(500).json({message:error.message});

}
};

export const getMembers = async (req, res)=>{
    try{
const members = await Member.find().sort({createdAt:-1});
res.json(members);
    }
    catch(error){
res.status(500).json({message:error.message});
    }
};

export const updateMember = async()=> {
    try{
const member = await Member.findByIdAndUpdate(req.params.id);
if(!member){
    return res.status(404).json({message:"Member not found"});
}

member.startDate = new Date();
member.status = "active";

await member.save();
res.json(member);
    }
    catch(error){
res.status(500).json({message:error.message});
    }
};

//delete

export const deleteMember = async (req, res)=> {
    try{
await Member.findByIdAndDelete(req.params.id);
res.json({message:"Member deleted"});
    }
    catch(error){
res.status(500).json({message:error.message});
    }
};