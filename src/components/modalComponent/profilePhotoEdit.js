import styled from "styled-components";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useState } from "react";

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
const Conteiner = styled.div`
    z-index: 1002;
    border-radius: 16px;
    width: 400px;
    height: 500px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Button = styled.label`
    /* transition: all 0.3s ease-in-out; */
    width: 110px;
    height: 26px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0095f6;
    color: white;
    cursor: pointer;
    &:hover{
        opacity: 0.8;
    }
`
const IconBox = styled.div`
    margin: 40px 0;
`


export default function EditProfilePhoto({closeModal,profilePhoto}){
    const [photo, setPhoto] = useState()
    return(
        <Wrap>
            <CloseDiv onClick={closeModal}></CloseDiv>
            <Conteiner>
                <IconBox><MdOutlineAddAPhoto size={60}/></IconBox>
                <input type="file" id="photo" style={{display:'none'}}/>
                <Button htmlFor="photo">사진 가져오기</Button>
            </Conteiner>
        </Wrap>
    );
}