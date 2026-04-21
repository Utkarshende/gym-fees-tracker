const DashboardCard = ({title, value})=>{
return(
    <div style={styles.card}>
        <h3>
{title}
        </h3>
        <h1>
            {value}
        </h1>
    </div>
)
}

const styles={
card:{
    flex:"1 1 150px",
    padding:"15px",
    borderRadius:"#1e293b",
    textAlign:"center"
}
};

export default DashboardCard;