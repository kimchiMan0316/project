import { MdOutlineAddAPhoto } from "react-icons/md";
import styled from "styled-components";

const Button = styled.label`
    /* transition: all 0.3s ease-in-out; */
    width: 110px;
    height: 28px;
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
    margin: 10px 0;
`
const P = styled.p`
    margin: 20px 0;
    font-size: 15px;
    font-weight: 500;
`

export default function GetPhoto({ handlePhoto }){

    const getProfilePhoto = (e) =>{
        const files = e.target.files[0]
        if(!files){return};
        const reader = new FileReader();
        reader.onload = () => {
            const imageUrl =reader.result?.toString() || "";
            handlePhoto(imageUrl)
        };
        reader.readAsDataURL(files)
    }


    return(
        <>  
            <IconBox><MdOutlineAddAPhoto size={60}/></IconBox>
            <P>프로필 사진을 업로드 해보세요!</P>
            <input type="file" id="photo" accept="image/*" style={{display:'none'}} onChange={getProfilePhoto}/>
            <Button htmlFor="photo">사진 가져오기</Button>
        </>
    )
}