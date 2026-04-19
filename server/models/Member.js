import mongoose from 'mongoose';

const memberSchema =new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        phone:{
            type:String,
        },
        plan:{
            type:String,
            enum:["monthly","quarterly"],
                default:"monthly",
        },
        fee:{
            type:Number,
            required:true
        },
        startDate:{
            type:Date,
            required:true,
            default:Date.now
        },
        endDate:{
            type:Date
        },status:{
            type:String,
            enum:["active","expired"],
            default:"active"
        },
    },
    {timestamp:true}
);

//auto calulate enddate

memberSchema.pre("save", function (next){
    const start = new Date(this.startDate);

    if(this.plan === "monthly"){
        start.setmMonth(start.getMonth()+1);
    }
    else if (this.plan === "quarterly"){
        start.setMonth(start.getMonth() +3);
    }
this.endDate = start ;
next();
});

const Member = mongoose.model("Member", memberSchema);

export default Member;