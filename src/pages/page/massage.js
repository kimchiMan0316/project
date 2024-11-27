import { Client } from "@stomp/stompjs"
import { useEffect, useState } from "react"
import styled from "styled-components"
import ChatRoomBoxsLayout from "../../components/chat/components/layout/chatRoomBoxsLayout"
import useProfileStore from "../../store/useProfile"
import { formatTime } from "../../utills/formatTime"


const Wrap = styled.div`
    position: relative;
    left: 550px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    background-color: white;
`
const Box = styled.div`
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-between;
`
const RoomTitle = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: aqua;
`
const MessageConteiner = styled.div`
    position: relative;
    width: 90%;
    margin: 50px 30px 10px 30px ;
    height: auto;
    min-height: 500px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: end;
    &::-webkit-scrollbar{
        display: none;
    }
    /* background-color: antiquewhite; */
`
const MessageBox = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    max-width: 450px;
    padding: 6px 10px;
    height: auto;
    border-radius: 10px;
    margin: 2px 0;
`
const UserProfile = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid black;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
`
const MessageArea = styled.div`
    width: auto;
    max-width: 348px;
    word-wrap: break-word; 
    overflow-wrap: break-word; 
    box-sizing: border-box;
    font-size: 15px;
    padding: 4px 10px;
    margin: 0 6px;
    border-radius: 14px;
    border: 1px solid black;
`
const Time = styled.div`
    font-size: 10px;
    min-width: 40px;
    height: 100%;
    display: flex;
    align-items: last baseline;
`
const CreateMessageBox = styled.form`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    border: none;
`
const InputBox = styled.div`
    transition: all 0.3s ease-in-out;
    display: flex;
    justify-content: center;
    width: 90%;
    border: ${(props)=>(props.input ? '1px solid #0095f6':'1px solid #d5d5d5')};
    border-radius: 30px;
    padding: 4px;
`
const Input = styled.input`
    width: 90%;
    border: none;
    border-radius: 10px;
    padding: 10px;
    outline: none;
`
const Button = styled.button`
    transition: all 0.3s ease-in-out;
    border: none;
    background-color: transparent;
    color: ${(props)=>(props.input ? "#0095f6":"#647177")};
    opacity: 0.7;
    font-size: 15px;
    cursor: pointer;
    font-weight: 600;
    &:hover{
        opacity: 1;
    }
`

export default function Message(){
    const { userProfile } = useProfileStore()
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [connect, setConnect] = useState(null)
    const [ room, setRoom ] = useState(null)
    const [legacyMessage, setLegacyMessage ] = useState([])
    const username = userProfile.username;
    

    useEffect(()=>{
        if(!room){
            return;
        }
        const client = new Client({
            brokerURL : "ws://localhost:8080/ws",
            debug: (str)=>console.log(str),
            reconnectDelay: 5000, //자동 재 연결
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect : ()=>{
                client.subscribe(`/sub/chat/${room}`, (message) => {
                    console.log(message)
                    const message1 = JSON.parse(message.body)
                    setMessages((prev) => [...prev, message1]);
                    console.log(message1)
                });
            },
            onStompError: (frame) => {
                console.error("STOMP Error:", frame.headers["message"]);
            },
        })
        setConnect(client)
        client.activate();

        return ()=>{
            client.unsubscribe(`/sub/chat/${room}`);
            client.deactivate();
        };

    },[room])

    // 메세지 보내기 오류나면 좆댐 오류 처림 없음
    const sendMessage = (e)=>{
        e.preventDefault();
        if(connect && input.trim()){
            connect.publish({
                destination: `/pub/chat/message/${room}`, 
                body: JSON.stringify({ 
                    roomId : room,
                    message : input,
                    username : username,
                    profilePhoto : userProfile.profileImage,
                }),
            })
            console.log(input)
            setInput(""); 
        }
    }
    // 채팅방 접속하기
    const enterRoom = (e)=>{
        setRoom(e);
    }
    useEffect(()=>{
        if(!room){
            return;
        }
        fetch(`http://localhost:8080/api/chat/${room}/1`,{
            credentials:'include'
        })
        .then((response)=>{
            if(!response.ok){
                return;
            }
            return response.json()
        })
        .then((response)=>{
            console.log(response)
            setLegacyMessage((prev)=>[...prev, response])
        })
    },[room])

    const WIDTH = window.innerWidth-550;

    return(
       <Wrap style={{width:WIDTH}}>
            <ChatRoomBoxsLayout enterRoom={enterRoom}/>
            {connect ? 
            <Box style={{width:WIDTH}}>
                <RoomTitle></RoomTitle>
                <MessageConteiner>
                    {/* 이전 메세지 보기 */}
                    {legacyMessage && legacyMessage.map((item, index)=>
                    (item.memberDTO.username === username ?
                        <MessageBox key={index} style={{justifyContent:"right"}}>
                            <Time>{formatTime(item.createTime)}</Time>
                            <MessageArea>
                                {item.message}
                            </MessageArea>
                            <UserProfile>
                                <Img src={userProfile.profileImage}/>
                            </UserProfile>
                        </MessageBox>
                        :
                        <MessageBox key={index} style={{justifyContent:"left"}}>
                            <UserProfile>
                                <Img src={userProfile.profileImage}/>
                            </UserProfile>
                            <MessageArea>
                                {item.message}
                            </MessageArea>
                            <Time>{formatTime(item.createTime)}</Time>
                        </MessageBox>
                    )
                    )};
                    {/* 현재 메세지 보기 */}
                    {messages.map((item, index)=>
                    (item.username === username ?
                        <MessageBox key={index} style={{justifyContent:"right"}}>
                            <Time>{formatTime(item.time)}</Time>
                            <MessageArea>
                                {item.message}
                            </MessageArea>
                            <UserProfile>
                                <Img src={userProfile.profileImage}/>
                            </UserProfile>
                        </MessageBox>
                        :
                        <MessageBox key={index} style={{justifyContent:"left"}}>
                            <UserProfile>
                                <Img src={userProfile.profileImage}/>
                            </UserProfile>
                            <MessageArea>
                                {item.message}
                            </MessageArea>
                            <Time>{formatTime(item.time)}</Time>
                        </MessageBox>
                    )
                    )};
                </MessageConteiner>
                <CreateMessageBox onSubmit={sendMessage}>
                    <InputBox input={input}>
                        <Input type="text" placeholder="메시지 보내기" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                        <Button type="submit" input={input}>전송</Button>
                    </InputBox>
                </CreateMessageBox>
            </Box>
            :
            <h1>채널연결 없음</h1>
            }
       </Wrap>
    )
}

