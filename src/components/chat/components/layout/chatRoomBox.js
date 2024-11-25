import styled from "styled-components";

const Wrap = styled.div`
    position: fixed;
    left: 250px;
    height: 180px;
    width: 100%;
    display: flex;
    align-items: center;
`
const Image = styled.div`
    width: 50px;

`
const UserInf = styled.div`
    width: 200px;
    display: flex;
    justify-content: left;
    flex-direction: column;
`
const Date = styled.div`
    width: 50px;
`


export default function ChatRoomBox({chatRoomList}){
    console.log(chatRoomList)
    return(
        <Wrap>
            <Image>
                <img/>
            </Image>
            <UserInf>
                {/* 유저닉네임 들어갈 자리 */}
                {/* 메세지 들어갈 자리 */}
            </UserInf>
            <Date>
                {/* 시간들어갈 자리 */}
            </Date>
        </Wrap>
    );
}