import styled from "styled-components"
import { RiChat3Line } from "react-icons/ri";
import LoginInput from "../InputComponent/Login/logininput";
import { useState } from "react";
import Screen from "../modalComponent/screenModal";
import { FaRegBookmark } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { formatTime } from "../../utills/formatTime";
import { useNavigate } from "react-router-dom";
import EditPost from "../modalComponent/editPost";
import HomePhotoBox from "./homePhoto";
import LikeListModal from "../modalComponent/likeLIst";
import profile from "../../assets/image/profile.jpeg"

const Wrap = styled.div`
    width: 500px;
    height: auto;
    border: 1px solid black;
    margin: 5px 0;
`
const ProfileLayer = styled.div`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const PhotoLayer = styled.div`
    width: 498;
    height: 500px;
`
const ProfilePhoto = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    /* border: 1px solid black; */
    border-radius: 50%;
    overflow: hidden;
    margin: 0 10px;
    cursor: pointer;
`

const Username = styled.div`
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
`
const Date = styled.div`
    margin-left: 10px;
    font-size: 13px;
    font-weight: 600;
    color:#9398ae;
`
const Nickname = styled(Username)`
    font-size: 14px;
    font-weight: 400;
`
const ArticleLayer = styled.div``
const InfLayer = styled.div`
    /* padding: 0 0px; */
    margin: 0 4px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const LikeButton = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
`
const Button = styled(InfLayer)`
    justify-content: center;
    height: 36px;
    width: 36px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    &:hover{
        opacity: 0.8;
        background-color: #d9d9d9;
    }
`
const Acticle = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    height: auto;
    flex-direction: column;
    margin: 0 10px;
`
const P = styled.p`
    font-size: 16px;
    font-weight: 600;
`
const Div = styled.div`
    &[name="article"]{
        margin: 2px 0;
        font-size: 14px;
    }
`
const NicknameArea = styled.span`
    font-weight: 600;
    cursor: pointer;
`
const ArticleArea = styled.span`
    margin-left: 6px;
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`
const Form = styled.form``

export default function HomeContentsBox({item}){
    const navigate = useNavigate()
    const [ comment, setComment] =useState("");
    const [ screen, setScreen] = useState(false)
    // const [ postComment, setPostComment] = useState({})
    // 게시글 내용 깊은 복사 좋아요, 댓글 수 조정
    const post = JSON.parse(JSON.stringify(item));
    const [ likes, setLikes] = useState(post.likes);
    const [ liked, setLiked ] = useState(post.liked);
    const [ countComment, setcountComment] = useState(post.countComment);
    const [ editPostModal, setEditPostModal] = useState(false)
    const [ likeListModal, setLikeListModal] = useState(false)

    // 프로필페이지로 이동
    const moveProfile = () =>{
        if(item.me){
            navigate('/profile')
            return
        }
        navigate(`/profile/${post.username}`)
    }
    // 스크린 관리
    const closeScreen = () =>{
        setScreen(false)
    }
    // 댓글 상태
    const handleComment = (e) =>{
        setComment(e.target.value)
    }
    // 댓글 쓰기
    const sendComment = (e) => {
        e.preventDefault();
        const COMMENT = {
            article: comment
        }
        fetch(`http://localhost:8080/api/comment/${item.id}`,{
            credentials :'include',
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(COMMENT)
        })
        .then((Response)=>Response.json())
        .then((data)=>{
            console.log(data)
            setcountComment((prev)=>prev+1)
            setComment("")
        })
    }
    // 좋아요 눌렀을 때
    const handleLike = () =>{
        fetch(`http://localhost:8080/api/like/${item.id}`,{
            credentials :'include',
            method: 'POST',
        })
        .then((response)=>{
            console.log(response);
            if(response.ok){
                
            }else{
                return;
            }
        })
    }
    // 사용자 경험을 위해서 좋아요, 댓글 갯수 패치보내기 전에 증가시키기
    const countLike = () =>{
        if(liked){
            post.likes -= 1
            post.liked = false 
            setLikes((prev)=>prev-1)
            setLiked(false)
        }else if(!liked){
            post.likes += 1
            post.liked = true 
            setLikes((prev)=>prev+1)
            setLiked(true)
        }
        
    }
    // 스크린 모달 띄우기
    const onScreen = () =>{
        // fetch(`http://localhost:8080/api/comment/${post.id}/0`,{
        //     credentials:'include'
        // })
        // .then((response)=>response.json())
        // .then((data)=>{
        //     console.log(data)
        //     setPostComment(data)
        // })
        setScreen(true)
    }
    // 글 삭제 모달
    const editPost = (e) =>{
        e.stopPropagation();
        if(!post.me){
            return;
        }
        setEditPostModal(true)
    }
    // 글 삭제 모달 끄기
    const closeEditModal = () =>{
        setEditPostModal(false)
    }
    // 좋아요 리스트 모달
    const isLikeListModal = () =>{
        setLikeListModal(true)
    }
    const closeLikeListModal = () =>{
        setLikeListModal(false)
    }
    return(
        <Wrap id={item.id}>
            <ProfileLayer>
                <div style={{height:'100%',justifyContent:"center",display:"flex",alignItems:'center'}}>
                    <ProfilePhoto>
                        <img src={post.profileImage ||profile} style={{width:"100%"}}/>
                    </ProfilePhoto>
                    <Div style={{display:"flex", flexDirection:"column",height:"100%",alignItems:"start", justifyContent:"center"}}>
                        <Username onClick={moveProfile}>{item.username}</Username>
                        <Nickname>{item.nickname}</Nickname>
                    </Div>
                    <Date> •{formatTime(post.createTime)}</Date>
                </div>
                <div style={{marginRight:'10px',cursor:'pointer'}}>
                    <SlOptions color={post.me ? "black":"black"} onClick={editPost}/>
                    {editPostModal ? <EditPost closeModal={closeEditModal} postId={post.id}/>:null}
                </div>
            </ProfileLayer>
            <PhotoLayer>
                {/* 이미지슬라이더 */}
                <HomePhotoBox postImage={post.postImage} width={498} height={500}/>
            </PhotoLayer>
            <ArticleLayer>
                <InfLayer>
                    <div style={{display:'flex',justifyContent:'left',height:'40px',alignItems:'center'}}>
                        <LikeButton>
                            <Button >
                                <FaHeart size={24} color={liked ? "red":"gray"} onClick={()=>{countLike();handleLike();}}/>
                            </Button>
                            <P>{likes}</P>
                        </LikeButton>
                        <LikeButton>
                            <Button onClick={onScreen}>
                                <RiChat3Line size={26}/>
                            </Button>
                            <P>{countComment}</P>
                        </LikeButton>
                    </div>
                    <LikeButton>
                        <Button>
                            <FaRegBookmark size={22}/>
                        </Button>
                    </LikeButton>   
                </InfLayer>
                <Acticle>
                    <Div name="article" style={{fontSize:"14px",fontWeight:"600", cursor:"pointer"}} onClick={isLikeListModal}>{likes > 0 ? `좋아요 ${likes}`:""}</Div>
                    {likeListModal ? <LikeListModal closeModal={closeLikeListModal} postId={post.id}/>:null}
                    <Div name="article" style={{fontSize:"16px", display:"flex"}}>
                        <NicknameArea onClick={moveProfile}>{item.nickname}</NicknameArea>
                        <ArticleArea className="article">{item.article}</ArticleArea>
                    </Div>
                    <Div name="article" style={{cursor:"pointer"}} onClick={onScreen}>
                        댓글 더 보기
                    </Div>
                    <Form onSubmit={sendComment} style={{display:"flex", height:"100%" , alignItems:"center"}}>
                        <LoginInput width="410px" height="36px" placeholder="댓글달기..." border="none" value={comment} onChange={handleComment}/>
                        <LoginInput type="submit" height="30px" width="40px" value={comment ? "확인":""} backgroundColor="white" color={comment ? "black":""} fontWeight="600"/>
                    </Form>
                </Acticle>
            </ArticleLayer>
            {screen ? <Screen closeScreen={closeScreen} post={post}/>:""}
        </Wrap>
    )
}