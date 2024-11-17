import { useNavigate } from "react-router-dom";

export default function Protect({children}){
    const navigate = useNavigate()
    const checkSession = async() =>{
        const response = await fetch("http://localhost:8080/api/checkSession",{
            credentials : "include",
        })
        if(response.status == 200){
            
        }else{
            console.log(response)
            navigate("/login")
            return false
        }
    }
    const mySession = checkSession()
    if(!mySession){
        navigate("/login")
    }
    return children;
}