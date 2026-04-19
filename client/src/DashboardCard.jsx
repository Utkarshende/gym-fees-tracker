const DashboardCard = ({title, value})=>{
    return(
        <div style={style.card}>
            <h3>
                {title}
                </h3>
                <h1>
                    {value}
                    </h1>
                </div>
    )
}

const style={
    card:{
        padding:"20px",
        borderRadius:"12px",
        background:"#1e293b",
        width:"200px",
        color:"#fff",
        textAlign:"center",
    }
}