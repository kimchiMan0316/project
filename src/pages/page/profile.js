import { useEffect, useState } from "react"
import styled from "styled-components"
import { useLoaderData } from "react-router-dom";
import ProfilePostPhotoBox from "../../components/LayoutComponrnt/ProfilePostPhotoBox";
import FollowModal from "../../components/modalComponent/followModal";
import ProfileEditButton from "../../components/button/profileEditButton";
import UnFollowModal from "../../components/modalComponent/unFollowModal";

import img from "../../assets/image/nerd.JPEG"

const Wrap = styled.div`
    padding-left: 250px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 1100px;
    height: auto;
`
const ProfileArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 700px;
    height: 300px;
`
const ProfileImage = styled.div`
    width: 170px;
    height: 170px;
    margin-right: 80px;
    border: 1px solid  #efefef;
    border-radius: 50%;
    overflow: hidden;
`
const ProfileInf = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: start;
    flex-direction: column;
    height: auto;
    width: 450px;
`
const UsernameInf = styled.div`
    font-size: 18px;
    display: flex;
    align-items: center;
`
const AccountInf = styled.div`
    font-size: 16px;
    font-weight: 600;
`
const Message = styled.div``
const ProfileEdit = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    font-size: 16px;
    color: white;
    background-color: #efefef;
    border: none;
    border-radius: 2px;
    border-radius: 4px;
    cursor: pointer;
    padding: 10px;
    &:hover{
        background-color: #c9c9c9;
    }
`
const Nav = styled.div`
    text-align: center;
    width: 90%;
    padding: 10px 0;
    border-top: 2px solid  #efefef;
    font-weight: 600;
`
const PostBox = styled.div`
    width: 750px;
    height: auto;
    background-color: aliceblue;
`
const FollowButton = styled(ProfileEdit)`
    padding: 10px;
    color: #363636;
`
export default function Profile(){
    const userInf = useLoaderData();
    const [ followed, setFollowed ] = useState(userInf.followed);
    const [ followState, setFollowState ] = useState();
    const [ followList , setFollowList ] = useState(false);

    console.log(userInf)
    const closeFollowModal = () =>{

        setFollowList(false)
    }
    const getFollowerList = () =>{
        setFollowState(true)
        setFollowList(true)
    }
    const getFollowedList = () =>{
        setFollowState(false)
        setFollowList(true)
    }

    useEffect(()=>{
        window.scrollTo({top:0,behavior:"instant"})
    },[])
    // 언팔로우
    const closeUnFollowModal = () =>{
        setFollowed(false)
    }
    // 팔로우
    const handleFollowing = () =>{
        if(followed){
            return;
        }
        setFollowed(true)
        fetch(`http://localhost:8080/api/follow?followedId=${userInf.username}`,{
            credentials : 'include' ,
            method : 'POST',
        })
        .then((response)=>{
            console.log(response)
            if(response.status == 200){

            }else{
                return;
            }
        })
    }
    return(
        <Wrap>
            <ProfileArea>
                <div style={{display:'flex'}}>
                    <ProfileImage>
                        <img src={img} style={{width:'100%', height:'100%'}}/>
                    </ProfileImage>
                    <ProfileInf>
                        <UsernameInf>
                            <span style={{fontWeight:'600',fontSize:'20px'}}>{userInf.username}</span>
                            <span style={{margin:'0 10px'}}>{userInf.nickname}</span>
                            <div>
                                {userInf.me ? <ProfileEditButton/>: 
                                    (followed? <UnFollowModal closeUnFollowModal={closeUnFollowModal} followed={followed} userInf={userInf}/> : 
                                        <NotFollowed onClick={handleFollowing}/>)}
                            </div>
                        </UsernameInf>
                        <AccountInf>
                            <span>게시글 {userInf.postCount}</span>
                            <span style={{margin:"10px",cursor:'pointer'}} onClick={getFollowerList}>팔로워 {userInf.followerCount}</span>
                            <span style={{cursor:'pointer'}} onClick={getFollowedList}>팔로잉 {userInf.followedCount}</span>
                            {followList ? <FollowModal closeModal={closeFollowModal} username={userInf.username} state={followState} me={userInf.me}/>:null}
                        </AccountInf>
                        <Message>
                            <span>{userInf.message}</span>
                        </Message> 
                    </ProfileInf>
                </div>
            </ProfileArea>
            <Nav>게시글</Nav>
            <PostBox>
                <ProfilePostPhotoBox postImage={userInf.postImages || []}/>
            </PostBox>
        </Wrap>
    )
}

const NotFollowed = ({onClick}) =>{
    const buttonStyle = {
        backgroundColor : "#0095f6",
        color:'white',
    }
    return(
        <FollowButton onClick={onClick} style={buttonStyle}>팔로우</FollowButton>
    )
}