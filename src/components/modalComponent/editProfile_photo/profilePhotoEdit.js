import styled from "styled-components";
import { useRef, useState } from "react";
import GetPhoto from "./component/getPhoto";
import { centerCrop, convertToPixelCrop, makeAspectCrop, ReactCrop } from "react-image-crop"
import EditPhoto from "./component/EditPhoto";
import setCanvasPreview from "./component/setCanvasPreview";
import useProfileStore from "../../../store/useProfile";

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
const Box = styled.div`
    z-index: 1002;
    border-radius: 16px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Option = styled.div`
    width: 100%;
    height: 40px;
    background-color: white;
    border-radius: 16px 16px 0 0;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    
`
const Title = styled.div`
    height: 40px;
    background-color: white;
    /* width: 100%; */
    border-radius: 16px 16px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;

`
const Conteiner = styled.div`
    transition: all 0.3s ease-in-out;
    z-index: 1002;
    border-radius: 0 0 16px 16px;
    /* width: ${(props)=>(props.photo ? "600px":"400px")}; */
    /* height: ${(props)=>(props.photo ? "600px":"400px")}; */
    width: 600px;
    height: 600px;
    border-top: 1px solid #dedede;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Back = styled.div`
    color: #de1616;
    font-size: 14px;
    cursor: pointer;
    opacity: 0.6;
    &:hover{
        opacity: 1;
    }
    &[name='ok']{
        color: #212527;
    }
`

const MIN_WIDTH = 200;
const ASPECT_RITIO = 1;

const CropWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    border-radius: 0 0 16px 16px;
`
const Img = styled.img`
    transition: all 0.3s ease-in-out;
    width: 100%;
    height: 100%;
`

export default function EditProfilePhoto({closeModal, profilePhoto}){
    const { changeUserProfilePhoto, userProfile } = useProfileStore();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [photo, setPhoto] = useState('')
    const [crop, setCrop]= useState({
        unit : "px",
        width : 200,
        aspect: 1 
    })
    const [ errer, setError ] = useState('')
    
    const onImageLoad = (e) =>{
        const { width, height, naturalWidth, natuarlHeight } = e.currentTarget;
        console.log(width,height)
        
        if(natuarlHeight < MIN_WIDTH || naturalWidth < MIN_WIDTH){
            setError('이미지가 너무 작습니다.');
            handlePhoto('')   
            return;
        }

        if (!width || !height) {
            console.error("Invalid image dimensions");
            return;
        }

        const crop = makeAspectCrop(
            {
                unit: 'px',
                width: 200,
            },
            ASPECT_RITIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height)
        setCrop(centeredCrop);
    }

    const handlePhoto = (item) =>{
        setPhoto(item)
    }
    console.log(userProfile.profileImage)
    return(
        <Wrap>
            <CloseDiv onClick={closeModal}></CloseDiv>
            <Box>
                {photo ? 
                    <Option>
                        <Back onClick={()=>setPhoto('')}>취소</Back>
                        <Title>사진 편집</Title>
                        <Back name="ok" onClick={()=>{
                            setCanvasPreview(
                                imgRef.current,
                                previewCanvasRef.current,
                                convertToPixelCrop(
                                    crop,
                                    imgRef.current.width,
                                    imgRef.current.height
                                )
                            );
                            const canvas = previewCanvasRef.current;
                            const canvasUrl = canvas.toDataURL()
                            changeUserProfilePhoto(canvasUrl)
                            console.log(userProfile)
                            canvas.toBlob((blob)=>{
                                console.log(userProfile)
                                const formData = new FormData()
                                formData.append("image", blob, "image/*");
                                // 폼데이터 설정한걸 서버로 보내주기
                            })

                            closeModal()
                        }}>확인</Back>
                    </Option>
                    :
                    <Title>프로필 사진 변경</Title>
                }
                <Conteiner photo={photo}>
                    {photo ? (
                        <CropWrap>
                        {errer&&!photo && <p style={{color:'red'}}>{errer}</p>}
                        <ReactCrop
                            crop={crop}
                            onChange={(pixelCrop, persentCrop)=>setCrop(pixelCrop)}
                            circularCrop
                            keepSelection
                            aspect={ASPECT_RITIO}
                            minWidth={MIN_WIDTH}
                            maxWidth={600} // 크롭 영역 최대 너비
                            maxHeight={600} // 크롭 영역 최대 높이
                            >
                            <Img src={photo} ref={imgRef} style={{maxHeight:'600px',maxWidth: '600px'}} onLoad={onImageLoad}/>
                        </ReactCrop>
                        </CropWrap>
                        ) : (
                        <GetPhoto handlePhoto={handlePhoto}/>
                    )}
                </Conteiner>
            </Box>
            {crop&&
                <canvas
                    ref={previewCanvasRef}
                    style={{
                        display:'none',
                        objectFit:'contain',
                        width:'200px',
                        height:'200px'
                    }}
                ></canvas>
            }
        </Wrap>
    );
}