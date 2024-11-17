import { Link } from "react-router-dom"
import styled from "styled-components"
import logo from "../../assets/image/untityLogo.png"

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
`
const Logo = styled.div`
    width: 250px;
    /* height: 100px; */
    margin-bottom: 30px;
`
const Text = styled.h1`
    font-size: 100px;
`
const P = styled.p`
    font-size: 18px;
    font-weight: 500;
    color: #7e7e7e;
    &[name='bottom']{
        margin-top: 40px;
        font-size: 20px;
    }
`
export default function ErrorPage(){
    return(
        <Wrap>
            <Logo>
                <img src={logo} style={{width:'100%'}}/>
            </Logo>
            <Text>404 ERROR</Text>
            <P>죄송합니다. 페이지를 찾을 수 없습니다.</P>
            <P>다시 연결을 원하시면 <Link style={{textDecoration:'none',color:'#38b4ff'}} to={"/"}>여기</Link>를 클릭해주세요.</P>
            <P name="bottom">untity</P>
        </Wrap>
    )
}