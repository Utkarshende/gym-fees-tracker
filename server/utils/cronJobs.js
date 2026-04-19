import cron from "node-cron";

import Member from "../models/Member.js";

export const startCronJobs = ()=>{
    cron.schedule("0 9 * * *", async()=>{
        console.log("Running daily expiry check ...")
const today = new Date();


try{
    const expiredMembers = await Member.updateMany(
        {
            endDate:{
                $lt:today
            },
            status:"active"
        },
        {
            $set:{status:"expired"}
        }
    );
console.log(`Expired updated:${expiredMembers.modifiedCount}`);


//finfing member expry in 2 days

const twoDaysLater = new Date();
twoDaysLater.setDate(today.getDate() + 2);

const expiringSoon= await Member.find({
    enddate:{
        $gte:today,
        $lte:twoDaysLater
    }
});
console.log(`Members expiring soon:${expiringSoon.length}`);

expiringSoon.forEach((member)=>{
    console.log(
        `Reminder:${member.name} (${member.phone}) expires on ${member.endDate}`
    );
});
}
catch(error){
    console.log("Cron job error:",error.message);
}
    });};