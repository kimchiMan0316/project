import { Client } from "@stomp/stompjs"
import { useEffect, useState } from "react"
import styled from "styled-components"
import ChatRoomBoxsLayout from "../../components/chat/components/layout/chatRoomBoxsLayout"

const Wrap = styled.div`
    padding-left: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 1100px;
    height: 100vh;
    background-color: white;
`
const MessageConteiner = styled.div`
    width: 450px;
    margin: 20px 0;
    height: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: right;
    /* background-color: antiquewhite; */
`
const MessageBox = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    max-width: 300px;
    padding: 10px;
    height: 30px;
    border: 1px solid gray;
    border-radius: 10px;
    margin: 4px 0;
`
const CreateMessageBox = styled.form`
    width: 450px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    border: none;
`
const Input = styled.input`
    width: 380px;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px;
    outline: none;
`
const Button = styled.button`
    width: 50px;
    height: 38px;
    margin-left: 4px;
    border-radius: 10px;
    border: none;
    cursor:pointer;
    background-color: #38b4ff;
    color: white;
    &:hover{
        opacity: 0.8;
    }
`

export default function Message(){
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [connect, setConnect] = useState(null);

    console.log(messages)


    useEffect(()=>{
        const client = new Client({
            brokerURL : "ws://localhost:8080/ws",
            debug: (str)=>console.log(str),
            onConnect : ()=>{
                console.log("연결 성공")

                client.subscribe("/sub/chat/1", (message) => {
                    console.log("Received message:", message.body);
                    const message1 = String(message.body);
                    setMessages((prev) => [...prev, message1]);
                });
            },
            reconnectDelay: 5000, //자동 재 연결
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onStompError: (frame) => {
                console.error("STOMP Error:", frame.headers["message"]);
            },
        })
        setConnect(client)
        client.activate();

        return ()=>{
            client.unsubscribe("/sub/chat/1");
            client.deactivate();
        };

    },[])

    // 메세지 보내기 오류나면 좆댐 오류 처림 없음
    const sendMessage = (e)=>{
        e.preventDefault();
        if(connect && input.trim()){
            connect.publish({
                destination: "/pub/chat/message", 
                body: JSON.stringify({ 
                    roomId : 1,
                    message : input,
                }),
            })
            setInput(""); 
        }
    }

    return(
       <Wrap>
            <ChatRoomBoxsLayout/>
            <MessageConteiner>
                {messages.map((item, index)=>(<MessageBox key={index}>{item}</MessageBox>))}
            </MessageConteiner>
            <CreateMessageBox onSubmit={sendMessage}>
                <Input type="text" placeholder="메시지 보내기" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                <Button type="submit">전송</Button>
            </CreateMessageBox>
       </Wrap>
    )
}