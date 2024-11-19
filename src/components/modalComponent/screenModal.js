import styled from "styled-components"
import CommentBox from "../LayoutComponrnt/commentComponent"
import LoginInput from "../InputComponent/Login/logininput"
import { useEffect, useState } from "react"
import { SlOptions } from "react-icons/sl";
import { FaRegBookmark } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { RiChat3Line } from "react-icons/ri";
import { formatTime } from "../../utills/formatTime";
import EditPost from "./editPost";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/untityLogo.png"
import HomePhotoBox from "../LayoutComponrnt/homePhoto";
import { GoPlusCircle } from "react-icons/go";

const Wrap = styled.div`
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: rgba(0,0,0,0.8);
`
const CloseBox = styled.div`
    z-index: 1000;
    width: 100%;
    height: 100%;
    position: fixed;

`
const Conteiner = styled.div`
    z-index: 1001;
    width: 1200px;
    height: 800px;
    display: flex;
`
const ImageArea = styled.div`
    display: flex;
    align-items: center;
    width: 720px;
    height: 800px;
    background-color: black;
    overflow: hidden;
`
const ArticleArea = styled(ImageArea)`
    width: 480px;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    background-color: white;
`

const ProfileArea = styled.div`
    display: flex;
    justify-content: space-between;
    height: 60px;
    width: 100%;
    align-items: center;
    padding: 10px;
    &[name='profile']{
        margin: 0 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #dadde9;
    }
`
const Article = styled.div`
    transition: all 0.5s ease-in-out;
    width: 100%;
    min-height: 600px;
    overflow: hidden;
    overflow-y: scroll;
`
const Content = styled.div`
    width: 100%;
    padding: 10px;
    border-top: 1px solid #dadde9;
    border-bottom: 1px solid #dadde9;
`
const Comment = styled.div`
    margin: 10px;
`
const SetOffset = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
`
const CreateCommentArea = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    height: 140px;
    width: 100%;
    flex-direction: column;
    border-top: 1px solid #dadde9;
`
const P = styled.span`
    font-size: 15px;
    &[name='username']{
        font-weight: 600;
        font-size: 16px;
        margin-right: 6px;
        cursor: pointer;
    }
`
const Date = styled.div`
    margin-top: 10px;
    margin-left: 4px;
    font-size: 14px;
`
const ButtonArea = styled.form`
    display: flex;
    justify-content: space-between;
    padding: 6px 10px;
    width: 100%;
    height: 40px;
    &[name='inputArea']{
        justify-content: center;
    }
`
const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    cursor: pointer;
    &:hover{
        background-color: gray;
    }
`
const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    cursor: pointer;
    &:hover{
        background-color: gray;
    }
`
export default function Screen({closeScreen, post}){
    // post는 게시글 데이터의 깊은 복사본
    const [ comment, setCommet] = useState([])
    const [review, setReview] = useState("");
    const [ likes, setLikes] = useState(post.likes);
    const [ liked, setLiked ] = useState(post.liked);
    const [ editPost, setEditPost ] = useState(false);
    const [ offset, setOffset ] = useState(10)
    const navigate = useNavigate();
    
    console.log(post)

    useEffect(()=>{
        fetch(`http://localhost:8080/api/comment/${post.id}/0`,{
            credentials:'include'
        })
        .then((response)=>response.json())
        .then((data)=>{
            setCommet(data.comments)
        })
    },[])

    const closeEditPost = () =>{
        setEditPost(false)
    }
    const changereView = (e) =>{
        setReview(e.target.value);
    }
    // 댓글 작성하기
    const createComment = (e) =>{
        e.preventDefault();
        if(!review){
            return;
        }
        fetch(`http://localhost:8080/api/comment/${post.id}`,{
            credentials:'include',
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                article: review
            })
            })
            .then((Response)=>{
                if(Response.ok){
                    return Response.json()
                }else{
                    alert("오류")
                    return
                }
            })
            .then((data)=>{
                if(data){
                    console.log(data);
                    comment.unshift({...data})
                    setReview("")
                }else{
                    setReview("")
                    return
                }
            })
    }
    // 사용자 경험을 위한 똥꼬쇼 좋아요 부분
    const onClikeLike = () =>{
        setLiked((prev)=>!prev)
        if(liked){
            setLikes((prev)=>prev-1)
        }else if(!liked){
            setLikes((prev)=>prev+1)
        }
    }
    // 좋아요 버튼 핸들링
    const handleLikes = () =>{
        fetch(`http://localhost:8080/api/like/${post.id}`,{
            credentials:'include',
            method:'POST',
        })
        .then((Response)=>{
            if(!Response.ok){
                
                return;
            }
        })
    }
    // 프로필로 이동하기
    const moveProfile = () =>{
        const USERNAME = localStorage.getItem('username');
        if(USERNAME == post.username){
            navigate("/profile")
            return
        }else{
            navigate(`/profile/${post.username}`)
        }
    }
    const handleEditPost = () =>{
        if(!post.me){
            return
        }
        setEditPost(true)
    }
    // 댓글 더보기
    const showComment = () =>{
        fetch(`http://localhost:8080/api/comment/${post.id}/${offset}`,{
            credentials:'include'
        })
        .then((Response)=>{
            if(!Response.ok){
                return
            }
            return Response.json()
        })
        .then((response)=>{
            console.log(response)
            setCommet((prev=>[...prev,...response.comments]))
            setOffset(prev=>prev+10)
        })
    }
    return(
        <Wrap>
            <CloseBox onClick={closeScreen}></CloseBox>
            <Conteiner>
                <ImageArea>
                    <HomePhotoBox postImage={post.postImage} width={720} height={800}/>
                </ImageArea>
                <ArticleArea>
                    <ProfileArea>
                        <div style={{display:'flex'}}>
                            <ProfileArea name="profile" style={{cursor:'pointer'}}  onClick={moveProfile}>
                                <img src={logo} style={{width:"100%"}}/>
                            </ProfileArea>
                            <div style={{display:'flex',flexDirection:"column", cursor:'pointer'}} onClick={moveProfile}>
                                <span style={{fontWeight:"600"}}>{post.username}</span>
                                <span style={{fontSize:"14px"}}>{post.nickname}</span>
                            </div>
                        </div>
                        <div style={{width:"30px",height:'30px', display:'flex',alignItems:'center'}}>
                            <SlOptions color={post.me ? "black":"black"} style={{cursor:'pointer'}} onClick={handleEditPost}/>
                            {editPost ? <EditPost closeModal={closeEditPost}/>:null}
                        </div>
                    </ProfileArea>
                    <Article>
                        <Content>
                            <P name="username" onClick={moveProfile}>{post.username}</P>
                            <P>{post.article}</P>
                            <Date>{`${formatTime(post.createTime)}`}</Date>
                        </Content>
                        <Comment>
                            {comment.map((item)=>(<CommentBox closeScreen={closeScreen} key={item.commentId} comment={item} postId={post.id}/>))}
                        </Comment>
                        {post.countComment-offset > 0 ?  <SetOffset><GoPlusCircle size={20} style={{cursor:'pointer'}} onClick={showComment}/></SetOffset>:null}
                    </Article>
                    <CreateCommentArea>
                        <ButtonArea>
                            <div style={{display:'flex'}}>
                                <Button onClick={()=>{onClikeLike(); handleLikes();}}>
                                    <FaHeart size={24} color={liked ? "red":""}/>
                                </Button>
                                <Button>
                                    <RiChat3Line size={24}/>
                                </Button>
                            </div>
                            <div>
                                <Label htmlFor="comment">
                                    <FaRegBookmark size={20}/>
                                </Label>
                            </div>
                        </ButtonArea>
                        <span style={{margin: '6px 10px'}}>좋아요 {likes}</span>
                        <ButtonArea name="inputArea" onSubmit={createComment}>
                            <LoginInput type="text" id="comment" width="400px" height="30px" border="none" placeholder="댓글 쓰기 . . ." value={review} onChange={changereView}/>
                            <LoginInput type="submit" height="30px" width="50px" backgroundColor="white" color={review ? "rgb(74 84 194)":"#b1b0b0"} fontWeight="700" value="확인" placeholder="댓글 작성" border="none"/>
                        </ButtonArea>
                    </CreateCommentArea>
                </ArticleArea>
            </Conteiner>
        </Wrap>
    )
}