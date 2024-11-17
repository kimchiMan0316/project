import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.div`
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
`
const CancleBox = styled.div`
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
`
const Conteiner = styled.div`
    z-index: 1001;
    width: 380px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    border-radius: 10px;
    background-color: white;
`
const Title = styled.div`
    width: 100%;
    text-align: center;
    padding: 10px 0;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #9398ae;
    margin-bottom: 10px;
`
const List = styled.div`
    width: 95%;
    height: auto;
    overflow: hidden;
`
const ListBox = styled.div`
    z-index: 1004;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    margin-bottom: 4px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    &:hover{
        background-color: #c9c9c9;
    }
`
const Box = styled.div`
    display: flex;
`
const Image = styled.div`
    width: 36px;
    height: 36px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 10px;
`
const UserInf = styled.div`
    display: flex;
    flex-direction: column;
`
const Username = styled.div`
    font-weight: 500;
    &[name='sub']{
        font-size: 14px;
        font-weight: 400;
    }
`
const FollowButton = styled.div`
    z-index: 1005;
    font-size: 15px;
    padding: 3px 10px;
    border-radius: 6px;
    background-color: #0095f6;
    color: white;
`

export default function LikeListModal({closeModal, postId}){
    const [loading, setLoading ]= useState(false);
    const [likeList, setLikeList ] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:8080/api/likes/${postId}/0`,{
            credentials:'include',
        })
        .then((response)=>response.json())
        .then((response)=>{
            setLoading(true)
            setLikeList(response)
        })

    },[])
    return(
        <Wrap>
            <CancleBox onClick={closeModal}></CancleBox>
            <Conteiner>
                <Title>좋아요</Title>
                <List>
                    {loading ? (likeList.map((item, index)=>(<LikeListBox item={item} key={index}/>))):"loading"}
                </List>
            </Conteiner>
        </Wrap>
    );
}

const LikeListBox = ({item}) =>{
    const navigate = useNavigate()
    const moveProfile = () =>{
        navigate(`/profile/${item.username}`)
    }
    const handleFollow = () =>{

    }

    return(
        <ListBox>
            <Box>
                <Image>
                    <img src={item.profilePhoto} style={{width:'100%',height:'100%'}}/>
                </Image>
                <UserInf onClick={moveProfile}>
                    <Username>{item.username}</Username>
                    <Username name='sub'>{item.nickname}</Username>
                </UserInf>  
            </Box>
            {item.followed ? <FollowButton onClick={handleFollow}>팔로잉</FollowButton>:<FollowButton onClick={handleFollow}>팔로우</FollowButton>}
        </ListBox>
    )
}