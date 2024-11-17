import styled from "styled-components"
import LoginInput from "../../components/InputComponent/Login/logininput"
import { Footer } from "../../components/LayoutComponrnt/LayoutComponent"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import { linkStyle } from "../../utills/linkStyle"
import logo from "../../assets/image/untityLogo.png"
import kakaoLogin from "../../assets/image/kakao_login.png"




const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
`
const Conteiner = styled(Wrap)`
    flex-direction: row;
    width: 800px;
    height: 500px;
`
const ImageArea = styled.div`
    width: 50%;
    height: 100%;
    border:none;
`
const LoginArea = styled.form`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #d7d7d7;
    border-radius: 10px;
`
const Logo = styled.img`
    width: 200px;
    height: auto;
    margin-bottom: 30px;
`
const P = styled.span`
    font-size: 14px;
    text-decoration: none;
    margin: 20px 0 10px 0;
    &[name="forget"]{
        color:#6a737f;
        cursor: pointer;
        margin: 10px;
        font-size: 14px;
        &:hover{
            color: #212529
        }
    }
`
const AtherLogin = styled(Wrap)`
    border-top: 1px solid #d7d7d7;
    height: 60px;
    width: 80%;
`
const KakaoLogin = styled.div`
    width: 310px;
    height: 44px;
    cursor: pointer;
    &:hover{
        opacity: 0.80;
    }
`
export default function Login(){
    const [id, setId] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    
    const onChangeId =(e)=>{
        const value = e.target.value;
        setId(value)
    }
    const onChangePassword =(e)=>{
        const value = e.target.value;
        setPassword(value)
    }
    const forgetAccount = () =>{
        navigate("/forget-account") 
    }
    const login = (e) =>{
        e.preventDefault();
        if(!id && !password){
            alert("로그인 정보를 입력해주세요.");
            return;
        }
        const loginInf = {
            username : id, 
            password : password
        }
        fetch("http://localhost:8080/api/login",{
            method: 'POST',
            credentials:'include',
            headers :{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(loginInf)
        })
        .then((response)=>{
            if(response.status === 200){
                console.log(response)
                return navigate('/')
            }else{
                alert("로그인 정보를 다시 확인해주세요.")
                return;
            }
        })
    }
    return(
        <Wrap>
            <Conteiner>
                <ImageArea>
                    <img src="https://design.co.kr/wp-content/uploads/2024/07/%EC%95%A0%ED%94%8C-3-832x1165.jpg" style={{width:"100%",height:'100%'}}/>
                </ImageArea>
                <LoginArea onSubmit={login}>
                    <Logo src={logo} style={{cursor:"pointer"}}/>
                    <LoginInput type="text" width="310px" height="40px" fontSize="16px" value={id} onChange={onChangeId} placeholder={"아이디"} padding="0 8px" minLength={2}/>
                    <LoginInput type="password" width="310px" height="40px" fontSize="16px" value={password} onChange={onChangePassword} placeholder={"비밀번호"} padding="0 8px" minLength={2}/>
                    <LoginInput type="submit" width="310px" height="40px" fontSize="16px" value="로그인"/>
                    <P>아직 계정이 없으신가요 ? <Link to="/create-account" style={linkStyle}>계정 만들기</Link></P>
                    <AtherLogin>
                        <KakaoLogin>
                            <img src={kakaoLogin} style={{width:'100%',height:'100%'}}/>
                        </KakaoLogin>
                    </AtherLogin>
                    <div style={{display:"flex",marginTop:"10px" , alignItems:"bottom"}}>
                        <P name="forget" onClick={forgetAccount}>아이디/비밀번호를 잊어버리셨나요?</P>
                    </div>
                </LoginArea>
            </Conteiner>
            <Footer/>
        </Wrap>
    )
}