import { useEffect, useState } from "react"
import styled from "styled-components"
import ChatRoomBox from "./chatRoomBox";
import useProfileStore from "../../../../store/useProfile";

const Wrap = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    left: 250px;
    width: 300px;
    border-right: 1px solid #ededed;
`
const SearchArea = styled.div`
    width: 100%;
    min-height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #ededed;
`
const ProfileImage = styled.div`
    width: 120px;
    height: 120px;
    border: 2px solid #38b4ff;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
`
const Username = styled.div`
    font-size: 20px;
    font-weight: 500;
`
const Message = styled.div`
    font-size: 14px;
`
const ChatRoomBoxs = styled.div`
    width: 100%;
    height: auto;
    min-height: 50vh;
    overflow: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
`
export default function ChatRoomBoxsLayout({enterRoom}){
    const { userProfile } = useProfileStore()
    const [ loading , setLoading ] = useState(false);
    const [ chatRoomList, setChatRoomList ] = useState([]);
    const [ number, setNumber ] = useState(0)
    
    useEffect(()=>{
        fetch(`http://localhost:8080/api/chatroom/${number}`,{
            credentials:'include'
        })
        .then((response)=>{
            if(!response.ok){
                console.log('안옴');
            }
            return response.json()
        })
        .then((response)=>{
            const username = localStorage.getItem('username');

            const updatedResponse = response.map((chatroom) => ({
                ...chatroom,
                members: chatroom.members.filter((member) => member.username !== username),
            }));
            console.log(updatedResponse)

            // 업데이트된 데이터 설정
            setChatRoomList(updatedResponse);
            setLoading(true);
        })
    },[])
    
    return(
        <Wrap>
            <SearchArea>
                <ProfileImage>
                    <Img src={userProfile.profileImage}/>
                </ProfileImage>
                <Username>{userProfile.username}</Username>
                <Message>{userProfile.message}</Message>
            </SearchArea>
            <ChatRoomBoxs>
                {
                    loading ?  chatRoomList.map((item, index)=>(
                        <ChatRoomBox
                            key={index}
                            chatRoomList={item}
                            enterRoom={enterRoom}/>
                    ))
                    :
                        <h1>로딩중...</h1>
                }
            </ChatRoomBoxs>  
        </Wrap>
    )
}