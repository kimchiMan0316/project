import styled from "styled-components";
import { MdOutlineAddAPhoto } from "react-icons/md";

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
    width: 500px;
    height: 600px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Button = styled.div`
    transition: all 0.3s ease-in-out;
    width: 110px;
    height: 26px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3182f6;
    color: white;
    cursor: pointer;
    &:hover{
        background-color: #2465c0;
    }
`
const IconBox = styled.div`

`


export default function EditProfilePhoto({closeModal,profilePhoto}){
    return(
        <Wrap>
            <CloseDiv onClick={closeModal}></CloseDiv>
            <Conteiner>
                <IconBox><MdOutlineAddAPhoto size={60}/></IconBox>
                <Button>사진 가져오기</Button>
            </Conteiner>
        </Wrap>
    );
}