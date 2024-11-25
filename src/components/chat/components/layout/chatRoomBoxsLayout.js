import { useEffect, useState } from "react"
import styled from "styled-components"
import { chatRoomInf } from "../../utill/fetctChatingRoom_inf";
import ChatRoomBox from "./chatRoomBox";

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: start;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    left: 250px;
    width: 300px;
    background-color: aliceblue;
`

export default function ChatRoomBoxsLayout(){
    const [ loading , setLoading ] = useState(false);
    const [ chatRoomList, setChatRoomList ] = useState(false);
    const [ number, setNumber ] = useState(0)
    
    useEffect(()=>{
        fetch(`http://localhost:8080/api/chatroom/${number}`,{
            credentials:'include'
        })
        .then((response)=>{
            if(!response.ok){
                console.log('인옴');
            }
            return response.json()
        })
        .then((response)=>{
            console.log(response)
            setChatRoomList(response)
            setLoading(true);
        })
        
  
    },[])

    return(
        <Wrap>
            {loading ?  <ChatRoomBox chatRoomList={chatRoomList}/>:<h1>로딩중...</h1>}
        </Wrap>
    )
}