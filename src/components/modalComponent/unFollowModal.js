import { useState } from "react";
import styled from "styled-components";


const Wrap = styled.div`
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.4);
`
const CloseDiv = styled.div`
    z-index: 1001;
    width: 100%;
    height: 100vh;
    position: fixed;
`

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
    background-color: #c9c9c9;
`
const Conteiner = styled.div`
    z-index: 1002;
    border-radius: 16px;
    width: 360px;
    height: 200px;
    background-color: aliceblue;
`
const Title = styled.div`
    font-weight: 600;
    text-align: center;
    color: black;
    padding: 10px 0 ;
    border-bottom:1px solid  #c9c9c9;
`
const Box = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    height: auto;
    border-bottom: 1px solid  #c9c9c9;
`
const OptionBox = styled.div`
    text-align: center;
    width: 350px;
    height: 40px;
    color: black;
    padding: 10px 0;
    border-radius: 8px;
    padding: 10px;
    margin: 4px;
    &:hover{
        background-color: #c9c9c9;
    }
`
const Foot = styled.div`
    margin-top: 20px;
    font-size: 14px;
    color:#c9c9c9;
    text-align: center;
`
const UnFollowBox = styled.div`
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c9c9c9;
    &:hover{
        opacity: 0.8;
    }
`

export default function UnFollowModal({closeUnFollowModal, followed, userInf}){
    const [optionModal, setOptionModal] = useState(false)
    
    const openModal = () =>{
        setOptionModal(true)
    }
    const closeModal=(e)=>{
        e.stopPropagation()
        setOptionModal(false)
    }
    const handleUnFollow = () =>{
        if(!followed){
            console.log(followed)
            return;
        }
        closeUnFollowModal()
        fetch(`http://localhost:8080/api/unfollow?followedId=${userInf.username}`,{
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
        <ProfileEdit onClick={openModal}>
            <UnFollowBox>팔로잉</UnFollowBox>
            { optionModal ? 
            <Wrap>
                <CloseDiv onClick={closeModal}></CloseDiv>
                <Conteiner>
                    <Title>팔로잉</Title>
                    <Box>
                        <OptionBox onClick={handleUnFollow}>팔로잉 취소</OptionBox>
                        <OptionBox onClick={closeModal} style={{color:'red'}}>취소</OptionBox> 
                    </Box>
                    <Foot>untity</Foot>
                </Conteiner>
            </Wrap>
            :null}
        </ProfileEdit>
    )
}