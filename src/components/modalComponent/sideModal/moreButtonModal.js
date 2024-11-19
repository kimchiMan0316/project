import styled from "styled-components";
import { CiBookmark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoMdInformationCircle } from "react-icons/io";
import { TbMessageReportFilled } from "react-icons/tb";


const Wrap = styled.div`
    z-index: 200;
    position: fixed;
    bottom:16px;
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
    height: 160px;
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
    border-bottom: 1px solid gray;
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
export default function MoreButtonModal({closeModal}){
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
                <Title>더보기</Title>
                <Button onClick={handleEditPost}><IoMdInformationCircle size={20} style={{margin:"0 10px",color:'gray'}}/>문의하기</Button>
                <Button onClick={handleBookMark}><TbMessageReportFilled size={20} style={{margin:"0 10px",color:"#dc2d2d"}}/>신고하기</Button>
            </Conteiner>
        </Wrap>
    );
}