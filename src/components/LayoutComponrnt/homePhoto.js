import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { IoMdPhotos } from "react-icons/io";

const Wrap = styled.div`
    width : ${(props)=>(`${props.width}px`)};
    height: ${(props)=>(`${props.height}px`)};
    position: relative;
    overflow: hidden;
`
const ControllerBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`
const Label = styled.div`
    transition: all 0.4s ease-in-out;
    z-index: 100;
    position: absolute;
    top: 10px;
    right: 10px;
    color: black;
    opacity: ${(props)=>(props.move === 0 ? "0.8":"0")};
`

const LiftButton = styled.div`
    z-index: 100;
    left: 10px;
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #c9c9c9;
    opacity: ${(props)=>(props.move === 0 ? "0":"0.5")};
    &:hover{
        opacity: ${(props)=>(props.move === 0 ? "0":"0.8")};
        background-color: #c9c9c9;
    }
`
const RightButton = styled.div`
    z-index: 100;
    right: 10px;
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #c9c9c9;
    opacity: ${(props)=>(props.MAX === 0 ? "0":"0.5")};
    &:hover{
        opacity: ${(props)=>(props.MAX === 0 ? "0":"0.8")};
        background-color: #c9c9c9;
    }
` 
const ImageBox = styled.div`
    transition: all 0.3s ease-in-out;
    z-index: 99;
    position:relative;
    left: ${(props)=>`${props.move}px`};
    display: flex;
    width: auto;
    height: 100%;
`
const ImageArray = styled.div`
    background-color: black;
    text-align: center;
    width : ${(props)=>(`${props.width}px`)}; 
    height: ${(props)=>(`${props.height}px`)};
`

const Counter = styled.div`
    z-index: 100;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, -50%); /* 요소 중심을 기준으로 중앙 배치 */
    background-color: gray;
    width: 100px;
    height: 5px;
    border-radius: 3px;
    display: flex;
    opacity: 0.5;
`
const Persent = styled.div`
    transition: all 0.5s ease-in-out;
    height: 100%;
    width: ${(props)=>`${props.persent}%`};
    background-color: white;
`


export default function HomePhotoBox({postImage ,width, height}){
    postImage = postImage || []
    const [ move , setMove] = useState(0)

    const moveLeft = () =>{
        if(move === -(width*(postImage.length-1))){
            return;
        }
        setMove((prev)=>prev-width)
    }
    const moveRight = () =>{
        if(move === 0){
            return;
        }
        setMove((prev)=>prev+width)
    }
    const MAX = move+((postImage.length-1)*width)
    
    return(
        <Wrap>
            <ControllerBox>
                {postImage.length !== 1 ? <Label move={move}><IoMdPhotos size={20} opacity={0.5}/></Label>:null}
                <LiftButton onClick={moveRight} move={move}><IoIosArrowBack size={20}/></LiftButton>
                <ImageBox move={move} width={width} height={height}>
                    {postImage.map((item,index)=>(
                        <ImageArray key={index} src={item} width={width} height={height} referrerPolicy="no-referrer">
                            <img style={{backgroundSize: 'cover', height:'100%'}}  src={item} referrerPolicy="no-referrer"/>
                        </ImageArray>
                        ))}
                </ImageBox>
                <RightButton onClick={moveLeft} move={move} MAX={MAX}><IoIosArrowForward size={20}/></RightButton>
                {postImage.length === 1 ? null:<Counter><Persent persent={((move-width)/-(width*(postImage.length))*100)}></Persent></Counter> }
            </ControllerBox>
        </Wrap>
    );
}

