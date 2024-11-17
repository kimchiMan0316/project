import styled from "styled-components";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


const Wrap = styled.div`
    z-index: 200;
    position: fixed;
    bottom:64px;
    left: 224px;
`
const CloseDiv = styled.div`
    z-index: -1;
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
`
const Conteiner = styled.div`
    width: 260px;
    height: 210px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 0 3px 3px rgba(200, 200, 200, 0.2);
`
const Title = styled.div`
    width: 100%;
    text-align: center;
    padding: 10px 0;
    margin-bottom: 10px;
    border-bottom: 2px solid gray;
    font-size: 15px;
`
const Button = styled.div`
    width: 250px;
    height: 50px;
    background-color: white;
    border-radius: 10px;
    font-size: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover{
        background-color: #F2F2F2;
    }
`
export default function OptionModal({closeModal}){
    const navigate = useNavigate();

    const handleEditPost = () =>{
        navigate('/editProfile')
        closeModal()
    }
    const handleBookMark = () =>{
        // 클릭시 이벤트 처리하기
    }
    const logout = () =>{
        fetch('http://localhost:8080/api/logout',{
            credentials :'include'
        })
        .then((response)=>{
            if(!response.ok){
                console.log('로그아웃 실패')
            }
            navigate("/login")
        })
        
    }
    return(
        <Wrap>
            <CloseDiv onClick={closeModal}></CloseDiv>
            <Conteiner>
                <Title>설정</Title>
                <Button onClick={handleEditPost}><IoPersonCircleOutline style={{margin:"0 10px"}}/>프로필 설정</Button>
                <Button onClick={handleBookMark}><CiBookmark style={{margin:"0 10px"}}/>저장됨</Button>
                <Button onClick={logout}><IoLogOutOutline style={{margin:"0 10px"}}/>로그아웃</Button>
            </Conteiner>
        </Wrap>
    );
}