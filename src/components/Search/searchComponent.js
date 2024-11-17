import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useProfileStore from "../../store/useProfile";
import logo from "../../assets/image/untityLogo.png";

const Wrap = styled.div`
    height: 50px;
    width: 400px;
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    border-radius: 8px;
    cursor: pointer;
    &:hover{
        background-color: #d9d9d9;
    }
`
const PhotoArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 10px;
`
const UserInf = styled.div`
    display: flex;
    flex-direction: column;
`

const P = styled.p`
    font-size: 14px;
    &[name="username"]{
        font-size: 17px;
        font-weight: 600;
    }

`
export default function SearchInf({username, nickname, profilePhoto, closeModal}){
    const { userProfile } = useProfileStore();
    const navigate = useNavigate()
    const viewProfile = () =>{
        navigate(`/profile/${username}`)
    }
    return(
        <Wrap onClick={()=>{viewProfile();closeModal();}}>
            <PhotoArea>
                <img src={logo} style={{width:"100%"}}/>
            </PhotoArea>
            <UserInf>
                <P name="username">{username}</P>
                <P name="nickname">{nickname}</P>
            </UserInf>
        </Wrap>
    );
}