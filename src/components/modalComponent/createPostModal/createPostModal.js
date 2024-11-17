import styled from "styled-components"
import LoginInput from "../../InputComponent/Login/logininput"
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
    height: 700px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    overflow: hidden;
`
const OptionLayer = styled.div`
    display: flex;
    width: 100%;
    justify-content: ${(props)=>(props.state ? "space-between":"center")};
    align-items: center;
    padding: 0 20px;
`
const Button = styled.div`
    font-size: 15px;
    cursor: pointer;
    &:hover{
        color: #38b4ff
    }
    &[name='next']{
        color: #38b4ff;
        &:hover{
        color: #212527;
        }
    }
`
const Box = styled.div`
    transition: all 0.2s ease-in-out;
    width: ${(props)=>(props.article ? "980px":"680px")};
    height: 630px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: start;
    border-top: 1px solid #dbdbdb;
`
const Title = styled.div`
    font-weight: 600;
    margin: 10px 0;
`
const PhotoUploadArea = styled.div`
    width: 680px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`
const Photo = styled.input`
    display: none;
`
const Label = styled.label`
    color: black;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 30px;
    border-radius: 8px;
    background-color: #0095f6;
    color: white;
    font-size: 14px;
    margin-top: 16px;
    &:hover{
        opacity: 0.8;
    }
`
export default function CreatePostModal({closeModal}){
    const [ Modal, setModal] = useState(false)
    const [ state, setState] = useState("게시글 만들기")
    const [ photos, setPhoto] = useState([])
    const [ article, setArticle ] = useState(false)

    // 사진 미리보기
    function insertPhoto(e) {
        console.log(e.target.files);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            setPhoto(() => ([e.target.result]));
            setState("사진 편집");
        };
        reader.readAsDataURL(file);
    }
    // 사진 없는 첫화면으로 가기
    const backState = () =>{
        setPhoto([])
        setState("게시글만들기")
    }
    const backArticle = () =>{
        setArticle(false)
    }
    const back = () =>{
        if(photos.length&&article){
            backArticle()
        }else if(photos.length&&!article){
            backState()
        }
    }
    // 게시글 작성 종료 모달 핸들링
    const openModal = () =>{
        setModal(true)
    }
    const closeCloseModal=()=>{
        setModal(false)
    }
    // 게시글 작성하기
    const createArticle = () =>{
        setArticle(true)
        setState("게시글 작성하기")
    }

    return(
        <Wrap>
            <CloseDiv onClick={openModal}></CloseDiv>
            { Modal ? <ClosePostModal closeModal={closeModal} closeCloseModal={closeCloseModal}/>:null}
            <Conteiner>
                <OptionLayer state={photos.length}>
                    {photos.length ? <Button onClick={back}>뒤로</Button>:null}
                    <Title>{state}</Title>
                    {photos.length ? <Button name="next" onClick={createArticle}>다음</Button>:null}
                </OptionLayer>
                <Box article={article}>
                    {photos.length ? 
                        <EditPhoto photos={photos}/>
                        :
                        <PhotoUploadArea>
                            <MdOutlineAddPhotoAlternate size={30}/>
                            <Title style={{fontSize:'22px'}}>사진을 선택해주세요</Title>
                            <Photo type="file" multiple id="photo" onChange={insertPhoto}/>
                            <Label htmlFor="photo" >사진 가져오기</Label>
                        </PhotoUploadArea>}
                        {article ? <CreatePostArticle/>:null}
                </Box>
            </Conteiner>
        </Wrap>
    )
}