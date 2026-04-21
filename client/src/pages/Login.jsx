import { use, useState } from "react"
import API from '../services/api.js'

const Login = ({setAuth})=>{
const[email, setEmail] = useState("");
const [password, setPassword]=useState("")

const handlelogin = async ()=>{
    try{
const res = await API.post("/auth/login", {email, password});
localStorage.setItem("token", res.data.token);

    }
    catch(error){
alert("Login failed")
    }
};
return(
    <div style={style.container}><h2>Admin Login</h2>
    <input
    placeholder="Email"
    value={email}
    onChange={(e)=>{setEmail(email.target.value)}}
    style={styles.input}/>
    
    <input
    placeholder="Password"
    value={password}
    onChange={(e)=>{setPassword(password.target.value)}}
    style={styles.input}/>
    
    <button onClick={handlelogin} style={styles.button}>
        Login
    </button>
    </div>
)
}

const styles={
    container:{
        displeay:"flex",
        flexDirection:"column",
        gap:"10px",
        maxWidth:"300px",
        margin:"100px auto"
    },
    input:{
        padding:"10px",
        borderRadius:"6px",
        border:"none"
    },
    button:{
        padding:"10px",
        background:"#22c55e",
        border:"none",
        color:"#fff",
        cursor:"pointer"
    }
}

export default Login;