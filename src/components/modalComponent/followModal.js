import { useEffect, useState } from "react";
import styled from "styled-components";
import LoginInput from "../InputComponent/Login/logininput";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/untityLogo.png"

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
    width: 470px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    border-radius: 10px;
    background-color: white;
`
const Title = styled.h1`
    font-size: 17px;
    border-bottom: 1px solid #d9d9d9;
    width: 100%;
    text-align: center;
    padding: 10px 0;
`
const SearchingBar = styled.div`
    margin: 10px 0 ;
`
const List = styled.div`
    width: 100%;
    height: auto;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`
const ListComponent = styled.div`
    width: 400px;
    height: 50px;
    padding: 8px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    margin: 4px 0;
    cursor: pointer;
    &:hover{
        background-color: #d9d9d9;
    }
`
const Profile = styled.div`
    display: flex;
`
const ImageArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    margin-right: 10px;
`
const ProfileArea = styled.div`

    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
`
const Username = styled.div`
    font-size: 16px;
    font-weight: 600;
    &[name='nickname']{
        font-size: 14px;
        font-weight: 400;
    }
`

export default function FollowModal({closeModal, username, state, me}){
    const [loading, setLoading] = useState(true)
    const [ list, setList ] = useState([])
    const [ search, setSearch] = useState("")
    const [ searchList, setSearchList] = useState([])

    console.log(list)
    // 기존 팔로우/팔로잉 배열에서 필터해서 찾기 서버 이용x
    const onChage = (e) =>{
        setSearch(e.target.value);
        if(me){
            if(state){
                // 팔로워 찾기
                fetch(`http://localhost:8080/api/followed`)
                .then((response)=>response.json())
                .then((response)=>{
                    console.log(response)
                })
            }else if(!state){
                // 팔로잉 찾기
                fetch(`http://localhost:8080/api/follower`,{
                    credentials:'include'
                })
                .then((response)=>response.json())
                .then((response)=>{
                    console.log(response)
                })
            }
        }else if(!me){
            if(state){
                fetch(`http://localhost:8080/api/follower?username=${search}`,{
                    credentials:'include'
                })
                .then((response)=>response.json())
                .then((response)=>{
                    console.log(response)
                })
            }else if(!state){
                fetch(`http://localhost:8080/api/followed?username=${search}`,{
                    credentials:'include'
                })
                .then((response)=>response.json())
                .then((response)=>{
                    console.log(response)
                })
            }
        }
    }
    useEffect(()=>{
        if(me){
            if(state){
                fetch(`http://localhost:8080/api/follower `,{
                    credentials:'include'
                })
                .then((response)=>response.json())
                .then((response)=>{
                    console.log(response);
                    setList(response)
                })
            }else if(!state){
                fetch(`http://localhost:8080/api/followed  `,{
                    credentials:'include'
                })
                .then((response)=>response.json())
                .then((response)=>{
                    console.log(response);
                    setList(response)
                })
            }
        }else if(!me){
            if(state){
                fetch(`http://localhost:8080/api/follower?username=${username}`,{
                    credentials:'include'
                })
                .then((response)=>response.json())
                .then((response)=>{
                    console.log(response);
                    setList(response)
                })
            }else if(!state){
                fetch(`http://localhost:8080/api/followed?username=${username} `,{
                    credentials:'include'
                })
                .then((response)=>response.json())
                .then((response)=>{
                    console.log(response);
                    setList(response)
                })
            }
        }
    },[])
    return(
        <Wrap>
            <CancleBox onClick={closeModal}></CancleBox>
            <Conteiner>
                <Title>{state ? "팔로워":"팔로잉"}</Title>
                <SearchingBar>
                    <LoginInput type='text' width='400px' padding="8px" height='35px' backgroundColor='#efefef' placeholder="검색..." value={search} onChange={onChage}/>
                </SearchingBar>
                <List>
                    {
                    !search ? 
                    (list.map((item,index)=>(<ListBox key={index} item={item} closeModal={closeModal}/>)))
                    :
                    (searchList.map((item,index)=>(<ListBox key={index} item={item} closeModal={closeModal}/>)))
                    }
                </List>
            </Conteiner>
        </Wrap>
    );
}

const ListBox = ({item, closeModal}) =>{
    const navigate = useNavigate()
    const moveProfile = () =>{
        navigate(`/profile/${item.username}`)
        closeModal()
    }

    return(
        <ListComponent onClick={moveProfile}>
            <Profile>
                <ImageArea>
                    <img src={logo} style={{width:'100%',}}/>
                </ImageArea>
                <ProfileArea>
                    <Username>{item.username}</Username>
                    <Username name="nickname">{item.nickname}</Username>
                </ProfileArea>
            </Profile>
        </ListComponent>
    ); 
}