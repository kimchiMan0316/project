import styled from "styled-components";
import { formatTime } from "../../../../utills/formatTime";

const Wrap = styled.div`
    height: 70px;
    width: 300px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    background-color: white;
    border: none;
    padding: 8px;
    cursor: pointer;
    &:hover{
        background-color: #ededed;
    }
`
const ImgArea = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 18px;
    /* border: 1px solid black; */
`
const ImgsBox = styled.div`
    width: 50px;
    height: 50px;
    /* display: flex; */
    position: relative;

`
const MiniProfilePhoto = styled.div`
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    border: 2px solid white;
    background-color: antiquewhite;
`
const ImgBox = styled.img`

`
const UserInfBox = styled.div`
    display: flex;
    width: 230px;
    height: 100%;
    align-items: center;
    justify-content: left;
`
const Image = styled.div`
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    /* border: 1px solid black; */
`

const UserInf = styled.div`
    margin: 0 10px;
    width: 180px;
    display: flex;
    justify-content: left;
    flex-direction: column;
`
const Title = styled.div`
    font-size: 14px;
    font-weight: 500;
`
const LastMessage = styled.div`
    margin-top: 4px;
    font-size: 12px;
    width: 160px;
    white-space: nowrap; /* 줄바꿈 방지 */
    overflow: hidden; /* 넘친 텍스트 숨기기 */
    text-overflow: ellipsis;
`
const Date = styled.div`
    display: flex;
    width: 50px;
    font-size: 11px;
`


export default function ChatRoomBox({chatRoomList, enterRoom}){
    const members = chatRoomList.members || []
    const lastMessage = chatRoomList.lastMessage || ""
    const time = chatRoomList.time
    const id = chatRoomList.roomId || null
    // console.log(id)
    const enterChatRoom = () => {
        enterRoom(id)
    }
    return(
        <Wrap onClick={enterChatRoom}>
            <UserInfBox>
                <Image>
                    {
                    chatRoomList.members.length >= 4 
                    ? <Imgs5 members={members || []}/>
                    :
                    chatRoomList.members.length === 3
                    ? <Imgs4 members={members || []}/>:
                    chatRoomList.members.length === 2
                    ? <Imgs3 members={members || []}/>:
                    <Img members={members || []}/>
                    }
                </Image>
                <UserInf>
                    <Title>{members.map((item)=>(<span>{item.username}</span>))}</Title>
                    <LastMessage>{lastMessage}</LastMessage>
                </UserInf>
            </UserInfBox>
            <Date>
                <span>{formatTime(time)}</span>
            </Date>
        </Wrap>
    );
}

const Imgs3 = ({members}) =>{
    return(
        <ImgsBox>
            <MiniProfilePhoto style={{top:"2px",left:"2px"}}>
                <img src={members[0].profilePhoto}/>
            </MiniProfilePhoto>
            <MiniProfilePhoto style={{bottom:"3px",right:"3px"}}>
                <img src={members[0].profilePhoto}/>
            </MiniProfilePhoto>
        </ImgsBox>
    );
}
const Imgs4 = ({members}) =>{
    return(
        <ImgsBox>
            <MiniProfilePhoto style={{bottom:"2px",left:"2px", width:"25px",height:"25px"}}>
                <img src={members[0].profilePhoto}/>
            </MiniProfilePhoto>
            <MiniProfilePhoto style={{bottom:"2px",right:"2px",width:"25px",height:"25px"}}>
                <img src={members[0].profilePhoto}/>
            </MiniProfilePhoto>
            <MiniProfilePhoto style={{top:"2px",left:"12px",width:"25px",height:"25px"}}>
                <img src={members[0].profilePhoto}/>
            </MiniProfilePhoto>
        </ImgsBox>
    );
}
const Imgs5 = ({members}) =>{
    
    return(
        <ImgsBox>
            <MiniProfilePhoto style={{top:"0px",left:"0px",width:"25px",height:"25px", border:'none'}}>
                <img src={members[0].profilePhoto}/>
            </MiniProfilePhoto>
            <MiniProfilePhoto style={{top:"0px",right:"0px",width:"25px",height:"25px",border:'none'}}>
                <img src={members[0].profilePhoto}/>
            </MiniProfilePhoto>
            <MiniProfilePhoto style={{bottom:"0px",left:"0px",width:"25px",height:"25px",border:'none'}}>
                <img src={members[0].profilePhoto}/>
            </MiniProfilePhoto>
            <MiniProfilePhoto style={{bottom:"0px",right:"0px",width:"25px",height:"25px",border:'none'}}>
                <img src={members[0].profilePhoto}/>
            </MiniProfilePhoto>
        </ImgsBox>
    );
}
const Img = ({members}) => {
    
    return(
        <ImgArea>
            <ImgBox src={members.profileImage} alt="error"/>
        </ImgArea>
    )
}