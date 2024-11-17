import styled from "styled-components"
import { FaHeart } from "react-icons/fa";
import { formatTime } from "../../utills/formatTime";
import { useState } from "react";
import ReCommentComponent from "./ReCommentCoponent";
import { useNavigate } from "react-router-dom";
import LoginInput from "../InputComponent/Login/logininput";
import logo from "../../assets/image/untityLogo.png"

const Conteiner = styled.div`
    height: auto;

`
const Wrap = styled.div`
    height: auto;
    min-height: 60px;
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 10px;
`
const ProfileImage = styled.div`
    width: 45px;
    height: 45px;
    border: 1px solid gray;
    overflow: hidden;
    border-radius: 50%;
    display: flex;
    align-items: center;
    margin: 0 10px;
`
const ProfileArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

`
const UserInf = styled.div`
    display: flex;
`
const CommentInf = styled.div`
    display: flex;
    justify-content: space-between;
`
const Username = styled.div`
    margin-right: 10px;
    font-weight: 600;
    font-size: 17px;
    cursor: pointer;
`
const Date = styled.div``
const Comment = styled.div``
const Recomment = styled.div`
    margin: 0 6px;
    cursor: pointer;
`
const CreateReComment = styled(Comment)`
    cursor: pointer;
`
const ReReComment = styled.h1`
    text-align: left;
    font-size: 13px;
    color:gray;
    cursor: pointer;
`
const ReReCommentBox = styled.div`
    height: auto;
    margin-left: 80px;
`
const Form = styled.form`
    display: flex;
    align-items: center;
`
export default function CommentBox({comment, postId}){
    const [ReCommentState, setReCommentState] = useState(false)
    const [ReComments, setReComments] = useState([])
    const [RecommentForm, setRecommentForm] = useState(false)
    const [createRecomment, setcreateRecomment] = useState("")
    const navigate = useNavigate();
    console.log(comment)

    const fetchRecomment = () =>{
        fetch(`http://localhost:8080/api/recomment/${postId}/${comment.commentId}/0`,{
            credentials:'include'
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            setReComments(data)
            setReCommentState(true)
        })
    }
    const moveProfile = () =>{
        const USERNAME = localStorage.getItem('username');
        if(USERNAME == comment.username){
            navigate("/profile")
        }else{
            navigate(`/profile/${comment.username}`)
        }
    }
    // 대댓글 상태관리
    const onChangeRecomment = (e) =>{
        setcreateRecomment(e.target.value)
    }
    // 대댓글 발송
    const SubmitRecomment = (e) =>{
        e.preventDefault();
        fetch(`http://localhost:8080/api/recomment/${postId}/${comment.commentId}`,{
            credentials:'include',
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                article : createRecomment
            })
        })
        .then((response)=>response.json())
        .then((response)=>{
            console.log(response)
            setReComments((prev)=>[ {...response},...prev])
            setcreateRecomment("");
            setReCommentState(true)
        })
    }

    return(
        <Conteiner>
            <Wrap>
                <ProfileImage>
                    <img src={logo} style={{width:"100%",}} onClick={moveProfile}/>
                </ProfileImage>
                <ProfileArea>
                    <UserInf>
                        <Username onClick={moveProfile}>{comment.username}</Username>
                        <Comment>{comment.article}</Comment>
                    </UserInf>
                    <CommentInf>
                        <div style={{display:'flex', width:'100%',fontSize:"14px", color:"rgb(120 118 118)"}}>
                            <Date>{formatTime(comment.date)}</Date>
                            <Recomment>{comment.reCommentCount > 0 ? `좋아요 ${comment.reCommentCount}개`:""}</Recomment>
                            <CreateReComment onClick={()=>setRecommentForm((prev)=>!prev)}>답글 달기</CreateReComment>
                        </div>
                    </CommentInf>
                </ProfileArea>
                <div style={{width:'30px',height:'30px',display:'flex',alignItems:'center',cursor:'pointer'}}>
                    <FaHeart size={14} color="gray"/>
                </div>
            </Wrap>
            <ReReCommentBox>
                {ReCommentState ? (ReComments.map((item)=>(<ReCommentComponent key={item.commentId} item={item}/>))): comment.reCommentCount > 0 ? <ReReComment onClick={fetchRecomment}>- 답글 보기({comment.reCommentCount})</ReReComment>:null}
                {RecommentForm ? 
                        (<Form onSubmit={SubmitRecomment}>
                            <LoginInput type='text' height="24px" border='none' width="80%" placeholder={`@${comment.username} 댓글 달기...`} value={createRecomment} onChange={onChangeRecomment} padding="0 4px"/>
                            <LoginInput type="submit" value="확인" backgroundColor="white" padding="0 4px" fontWeight="600" color={createRecomment ? "rgb(74 84 194)":"#b1b0b0"}/>
                        </Form>):null}
            </ReReCommentBox>
        </Conteiner>
    )
}

