import styled from "styled-components";

const Wrap = styled.div`
    z-index: 1010;
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
    z-index: 1011;
    width: 100%;
    height: 100vh;
    position: fixed;
`
const Conteiner = styled.div`
    z-index: 1012;
    border-radius: 16px;
    width: 360px;
    height: 190px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`
const Title = styled.div`
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Button = styled.div`
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    align-items: center;
    height: 50px;
    width: 100%;
    cursor: pointer;
    &[name='F']{
        border: 1px solid #ededed;
    }
    &:hover{
        opacity: 0.7;
    }
`
export default function ClosePostModal({closeModal, closeCloseModal}){
    return(
        <Wrap>
            <CloseDiv onClick={closeCloseModal}></CloseDiv>
            <Conteiner>
                <Title>
                    <h1 style={{fontSize:"17px",margin:'10px'}}>게시물을 삭제하시겠어요?</h1>
                    <p style={{fontSize:"14px"}}>지금 나가면 수정 내용이 저장되지 않습니다.</p>
                </Title>
                <Button onClick={closeModal} name="F" style={{color:'#ed4956'}}>삭제</Button>
                <Button onClick={closeCloseModal}>취소</Button>
            </Conteiner>
        </Wrap>
    );
}