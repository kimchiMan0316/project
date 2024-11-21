import { useEffect, useState } from "react"
import { centerCrop, makeAspectCrop, ReactCrop } from "react-image-crop"
import styled from "styled-components"

const MIN_WIDTH = 200;
const ASPECT_RITIO = 1;

const Wrap = styled.div`
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

export default function EditPhoto({photo, handlePhoto}){
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

    
    return(
        <Wrap>
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
                <Img src={photo} style={{maxHeight:'600px',maxWidth: '600px'}} onLoad={onImageLoad}/>
            </ReactCrop>
        </Wrap>
    )
}