import { useState } from "react"
import styled from "styled-components"
import LoginInput from "../../components/InputComponent/Login/logininput"
import { Footer } from "../../components/LayoutComponrnt/LayoutComponent"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Modal from "../../components/modalComponent/Emailmodal"
import { linkStyle } from "../../utills/linkStyle"
import logo from "../../assets/image/untityLogo.png"


const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
`
const Box = styled.form`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #d7d7d7;
    border-radius: 10px;
    height: auto;
    width: 370px;
    height: 460px;
    margin: 10px;
   &[name="sideBox"]{
    height: 50px;
   }
`
const P = styled.span`
    font-size: 15px;
    margin: 10px;
`
export default function CreateAccount(){
    const [ username, setUsername] = useState("")
    const [ email, setEmail] = useState("")
    const [ emailState, setEmailState] = useState(false)
    const [ password, setPassword ] = useState("")
    const [ nickname, setNickname ] = useState("")
    const [ emailCode, setEmailCode ] = useState("")
    const [ modal, setModal] = useState(true)
    const [ profilePhoto, setProfilePhoto] = useState(null)
    const navigate = useNavigate()

    const handleEmail = (e) =>{
        const EMAIL = e.target.value;
        setEmail(EMAIL);
    }
    const handleUsername = (e) =>{
        const USERNAME = e.target.value;
        setUsername(USERNAME);
    }
    const handlePassword = (e) =>{
        const PASSWORD = e.target.value;
        setPassword(PASSWORD);
    }
    const handleNickname = (e) =>{
        const NICKNAME= e.target.value;
        setNickname(NICKNAME);
    }
    const handleEmailCode = (e) =>{
        setEmailCode(e.target.value)
    }
    
    const closeModal = () =>{
        setModal(true);
    }
    // 이메일 전송
    const sendEmail = (e) =>{
        e.preventDefault()
        if(email.length < 5 || email.indexOf("@") == -1){
            alert("이메일을 양식을 다시 확인해주세요")
            return;
        }
        const mail = {
            email : email
        }
        setModal(false)
        fetch("http://localhost:8080/api/send/mail", {
            method : 'POST',
            credentials : 'include' ,
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(mail)
        })
        .then((response)=>{
            console.log(response)
            if(response.status==200){
                
            }else if(!response.status){
                alert("이미 가입한 email입니다.")
            }
        })
    }

    // 인증번호 전송
    const sendEmailCode = (e) =>{
        e.preventDefault()
        if(emailCode.length < 5){
            alert("인증번호를 다시 입력해주세요")
            return;
        }
        const code = {
            email : email,
            code : emailCode
        }
        console.log(code)
        fetch("http://localhost:8080/api/check/mail", {
            credentials : "include",
            method: 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(code)
        })
        .then((response)=>{
            console.log(response)
            if(response.status === 200){
                setModal(true)
                setEmailState(true)
            }else if(response.status === 400){
                setEmailCode("")
                alert("인증번호를 다시 입력해주세요.")
            }
        })
    }
    
    // 회원가입
    const handleSignIn = (e) =>{
        e.preventDefault();
        if (!emailState) {
            alert("Email 인증을 진행해주세요.");
            return;
        }
        if (username === "" || password === "" || nickname === "") {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        const formData = new FormData();
        formData.append("username",username);
        formData.append("password",password);
        formData.append("nickname",nickname);
        formData.append("email",email);
        if (profilePhoto) {
            formData.append("profilePhoto", profilePhoto);
        }

        fetch("http://localhost:8080/api/sign-in", {
            credentials : "include",
            method : 'POST',
            body: formData,
        })
        .then((response)=>{
            if(response.ok){
                return response.json()
            } else{
                throw new Error('회원가입 실패');
            }
        })
        .then((response)=>{
            console.log(response)
            navigate("/login")
        })
        .catch((error)=>{
            console.error(error)
        })
    }

    return(
        <Wrap>
            <Box onSubmit={handleSignIn}>
                <img src={logo} style={{width:"260px", cursor:"pointer"}} onClick={()=>navigate("/login")}/>
                <P>운티티에서 친구들과 소통해요.</P>
                <LoginInput type="text" width="300px" height="40px" padding="0 8px" placeholder="아이디" value={username} onChange={handleUsername} minLength={6}/>
                <LoginInput type="password" width="300px" height="40px" padding="0 8px" placeholder="비밀번호" value={password} onChange={handlePassword} minLength={6}/>
                <LoginInput type="text" width="300px" height="40px" padding="0 8px" placeholder="이메일" value={email} onChange={handleEmail}/>
                <div style={{width:"300px",display:"flex",justifyContent:"right"}}>
                    { email.length >=1 ? <LoginInput
                        type="submit"
                        width="80px" 
                        height={emailState ? "0":"30px"} 
                        marginBottom={emailState ? "0":"8px"}
                        value={emailState ? "인증완료":"인증하기"} 
                        backgroundColor={emailState ? "#38b4ff":"rgb(185 185 185)"} 
                        onClick={sendEmail}/>
                        :null}  
                </div>
                <LoginInput type="text" width="300px" height="40px" padding="0 8px" placeholder="닉네임" value={nickname} onChange={handleNickname} minLength={4}/>
                <LoginInput type="submit" width="300px" height="40px" value="회원가입" fontSize="16px"/>
                <P style={{color:"#4e5968"}}>계정이 있다면 바로 로그인 해주세요.</P>
            </Box>
            <Box name="sideBox">
                <P>이미 계정이 있으신가요? <Link to ="/login" style={linkStyle}>로그인</Link></P>
            </Box>
            <Footer/>
            { modal ? null:
                <Modal
                    onSubmit={sendEmailCode}
                    width="380px"
                    height="350px"
                    title="이메일 인증하기"
                    content={
                        <>
                            <P style={{marginBottom:"20px"}}>{email}로 이메일을 전송했습니다.</P>
                            <LoginInput type="text" width="180px" height="30px" padding="8px" placeholder="인증번호" onChange={handleEmailCode} value={ emailCode }/>
                            <LoginInput type="submit" width="180px" height="30px" value="인증하기" />
                        </>
                    }
                    closeModal={closeModal}
                />
            }
        </Wrap>
    )
}