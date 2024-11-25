import styled from "styled-components"
import { useState } from "react"
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import CreatePostArticle from "./createPostArticle";
import EditPhoto from "./createPostPhotoEdit";
import ClosePostModal from "./closePostModal";

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
    width: auto;
    height: 630px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    overflow: hidden;
`

export default function CreatePostModal({closeModal}){
    const [ modal, setModal ] = useState(false)

    const openSubModal = () =>{
        setModal(true)
    }
    const closeCloseModal = () =>{
        setModal(false)
    }
    const closeSubModal = () =>{
        closeModal()
    }

    return(
        <Wrap>
            <CloseDiv onClick={openSubModal}></CloseDiv>
            { modal ? <ClosePostModal closeModal={closeSubModal} closeCloseModal={closeCloseModal}/>:null}
            <Conteiner>
                
            </Conteiner>
        </Wrap>
    )
}