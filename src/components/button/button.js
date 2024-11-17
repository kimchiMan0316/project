import styled from "styled-components";

const Button = styled.button`
    transition: all 0.2s ease-in-out;
    width: 200px;
    display: flex;
    align-items: center;
    height: 40px;
    border: none;
    margin: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
    text-align: left;
    padding: 10px 16px;
    background-color: white;
    &:hover{
        background-color: #d9d9d9;
    }
`
const P = styled.span`
    margin: 0 10px;
    vertical-align: baseline;
`

export default function ButtonComponent(
    {width, height, color, value,
     backgroundColor , onClick , changeColor, 
     backgroundImage, icon ,callback,
    }){
    
    const style = {
        width: width,
        height: height,
        color: color,
        backgroundColor: backgroundColor,
        backgroundImage : backgroundImage,
    }
    return(
        <Button style={{style}} onClick={onClick} changeColor={changeColor} >{icon}<P>{value}</P></Button>
    );
}