import styled from "styled-components"

const Input = styled.input`
    border: 1px solid rgb(230 232 234);
    border-radius: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    &:focus{
        outline: none;
    }
    &[type="submit"]{
        transition: all 0.3s ease-in-out;
        background-color: #38b4ff;
        border: none;
        color: white;
        cursor: pointer;
        &:hover{
            opacity: 0.8;
        }
    }
`

export default function LoginInput({type, width, fontWeight, height, fontSize, value, onChange, placeholder, onClick, padding, backgroundColor,margin , color, marginBottom, minLength,border}){
    const option = {
        width: width,
        height: height,
        fontSize: fontSize,
        padding: padding,
        backgroundColor : backgroundColor,
        color: color,
        marginBottom : marginBottom,
        minLength : minLength,
        margin:margin,
        border: border,
        fontWeight:fontWeight,
    }
    return(
        <Input onChange={onChange} type={type} style={option} value={value} placeholder={placeholder} onClick={onClick} minLength={minLength}/>
    )
}