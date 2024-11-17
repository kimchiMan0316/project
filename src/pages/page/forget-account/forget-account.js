import { useState } from "react";
import styled from "styled-components";
import ForgetId from "./id/password/forget-id";
import ForgetPassword from "./id/password/forget-password";
import { Link } from "react-router-dom";
import logo from "../../../assets/image/untityLogo.png"

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
`
const Wrapper = styled(Wrap)`
    width: 550px;
    height: 600px;
    border: 1px solid #ededed;
    border-radius: 10px;
    
`
const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin: 20px 0;
`
const Conteiner = styled(Wrap)`
    flex-direction: column;
    justify-content: start;
    width: 450px;
    height: 400px;
    border-radius: 10px;
    border: 1px solid #cacaca;
`
const Form = styled.form``
const Switch = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
`
const Id = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50%;
    font-weight: 600;
    border-radius: ${(props)=>(props.state == "id" ? "10px 0 0 10px":"9px 0 10px 0")};
    border-right: ${(props)=>(props.state == "id" ? "none":"1px solid #cacaca")};
    border-bottom: ${(props)=>(props.state == "id" ? "none":"1px solid #cacaca")};
    background-color: ${(props)=>(props.state == "id" ? "white":"#cacaca")};
    color: ${(props)=>(props.state == "id" ? "black":"#fafafa")};
    cursor: pointer;
`
const Password = styled(Id)`
    border-right: none;
    border-radius: ${(props)=>(props.state == "password" ? "0 10px 0 0":"0 9px 0 10px")};
    border-left: ${(props)=>(props.state == "password" ? "none":"1px solid #cacaca")};
    border-bottom: ${(props)=>(props.state == "password" ? "none":"1px solid #cacaca")};
    background-color: ${(props)=>(props.state == "password" ? "white":"#cacaca")};
    color: ${(props)=>(props.state == "password" ? "black":"#fafafa")};
`
export default function ForgetAccount(){
    const [ state, setState ] = useState('id')
    const onSwitch = (e) =>{
        if(e.target.id ==="id"){
            setState("id")
            console.log(state)
        }else if( e.target.id === "password"){
            setState("password")
            console.log(state)
        } 
    }
    return(
        <Wrap>
            <Wrapper>
            <Link to="/login"><img src={logo} style={{width:"240px", margin:"16px 0"}}/></Link>
            <Conteiner>
                <Switch>
                    <Id onClick={onSwitch} state={state} id="id">아이디 찾기</Id>
                    <Password onClick={onSwitch} state={state} id="password">비밀번호 찾기</Password>
                </Switch>
            <Title>{state == 'id' ? "아이디 찾기":"비밀번호 변경"}</Title>
                {state =="id" ? <ForgetId/>: state == 'password' ? <ForgetPassword/>:null}
            </Conteiner>
            </Wrapper>
        </Wrap>
    );
}