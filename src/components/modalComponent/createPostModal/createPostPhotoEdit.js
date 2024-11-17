import styled from "styled-components"
import { IoMdPhotos } from "react-icons/io";
import { CgCrop } from "react-icons/cg";
import { LiaSearchPlusSolid } from "react-icons/lia";

const Wrap = styled.div`
    position: relative;
    width: 680px;
    height: 630px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Img = styled.img`
    width: 100%;
    background-color: black;
    max-height: 660px;
`
const AddPhotoButton = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    right: 20px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.6;
    background-color: black;
    &:hover{
        opacity: 0.8;
    }
`
const EditRatioButton = styled.div`
    position: absolute;
    bottom: 0;
    left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.6;
    background-color: black;
    &:hover{
        opacity: 0.8;
    }
`   
const EnlargementButton = styled(EditRatioButton)`
    left: 60px;
`

export default function EditPhoto({photos}){
    return(
        <Wrap>
            <AddPhotoButton><IoMdPhotos size={20} color="white"/></AddPhotoButton>
            <Img src={photos}/>
            <EditRatioButton><CgCrop size={20} color="white"/></EditRatioButton>
            <EnlargementButton><LiaSearchPlusSolid size={20} color="white"/></EnlargementButton>
        </Wrap>
    )
}