import styled from "styled-components"
import LoginInput from "../../../../../components/InputComponent/Login/logininput"
import { useState } from "react"
import Modal from "../../../../../components/modalComponent/Emailmodal"
import { Link } from "react-router-dom"

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 300px;
`
const P = styled.p`
    margin-bottom: 20px;
`

export default function ForgetId(){
    const [ email, setEmail ] = useState("") 
    const [ modal, setModal] = useState(true)
    const [ emailCode, setEmailCode] =useState("")
    
    const closeModal = () =>{
        setModal(true)
    }
    const onChangeEmailCode = (e) =>{
        setEmailCode(e.target.value)
    }
    const onChangeEmail = (e) =>{
        const EMAIL = e.target.value;
        setEmail(EMAIL);
    }
    
    const sendEmail = async(e) =>{
        e.preventDefault()
        if(email.length < 5 && email.indexOf("@") == -1){
            alert("이메일을 양식을 다시 확인해주세요")
            return;
        }
        
        const response = await fetch('http://localhost:8080/api/username',{
            credentials:'include',
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email: email})
        })
        const result = await response.json()
        if(result.status == 200){
            console.log(result)
            setModal(false)
        }else{
            alert("email을 다시 확인해주세요")
        }
    }
    const sendEmailCode = () =>{
        
    }
    return(
        <Form onSubmit={sendEmail}>
            <P style={{marginBottom:"10px"}}>사용하신 이메일을 입력해주세요</P>
            <P>인증번호를 입력하시고 이메일을 확인해주세요.</P>
            <LoginInput type="email" width="350px" height="40px" placeholder="email" padding="0 10px" fontSize="16px" value={email} onChange={onChangeEmail}/>
            <LoginInput type="submit" width="350px" height="40px" value="인증하기" fontSize="15px"/>
            <Link to="/login" style={{textDecoration:"none",color:"#38b4ff", margin:"10px"}}><P>untity2 로그인 하기</P></Link>
            <P>untity2</P>
            { modal ? null:
                <Modal
                    width="380px"
                    height="350px"
                    title="이메일 인증하기"
                    content={
                        <>
                            <P style={{marginBottom:"20px"}}>{email}로 이메일을 전송했습니다.</P>
                            <LoginInput type="text" width="180px" height="30px" padding="8px" placeholder="인증번호" value={emailCode} onChange={onChangeEmailCode}/>
                            <LoginInput type="submit" width="180px" height="30px" value="인증하기" onClick={sendEmailCode}/>
                        </>
                    }

                    closeModal={closeModal}
                />
            }
        </Form>
    )
}