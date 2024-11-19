import styled from "styled-components"
import { IoMdPhotos } from "react-icons/io";
import { CgCrop } from "react-icons/cg";
import { LiaSearchPlusSolid } from "react-icons/lia";

const Wrap = styled.div`
    position: relative;
    width: 680px;
    height: 630px;
    overflow: hidden;
    /* 임시 배경색 추가 */
    /* display: flex;
    flex-direction: column;
    align-items: center; */
`
const AddPhotoButton = styled.div` 
    z-index: 10;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 50px;
    right: 20px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.4;
    background-color: black;
    &:hover{
        opacity: 0.8;
    }
`
const EditRatioButton = styled.div`
    z-index: 10;
    position: absolute;
    bottom: 50px;
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
const Conteiner = styled.div`
    z-index: 9;
    position: absolute;
    top: 0;
    left: 0;
    width: 680px;
    height: 630px;
    overflow: hidden;
`
const ImagConteiner = styled.div`
    z-index: 1;
    /* position: absolute; */
    left: -100px;
    display: flex;  
    width: auto;
    height: 630px;
`
const ImageBox = styled(Conteiner)`
    text-align: center;
    background-color: black;
    height: 600px;
    width: 680px;
`
const Img = styled.img`
    width: auto;
    background-color: black;
    height: 100%;
`
export default function EditPhoto({photos}){
    return(
        <Wrap>
            <AddPhotoButton><IoMdPhotos size={20} color="white"/></AddPhotoButton>
            <Conteiner>
                <ImagConteiner>
                    <ImageBox>
                        <Img src={photos}/>
                    </ImageBox>
                    <ImageBox>
                        <Img src={photos}/>
                    </ImageBox>
                </ImagConteiner>
            </Conteiner>
            <EditRatioButton><CgCrop size={20} color="white"/></EditRatioButton>
            <EnlargementButton><LiaSearchPlusSolid size={20} color="white"/></EnlargementButton>
        </Wrap>
    )
}