import styled from "styled-components";

const Wrap = styled.div`
    z-index: 1000;
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
    z-index: 1001;
    width: 100%;
    height: 100vh;
    position: fixed;
`
const Conteiner = styled.div`
    z-index: 1002;
    border-radius: 16px;
    width: 360px;
    height: 190px;
    background-color: white;
`
const Title = styled.div`
    font-weight: 600;
    text-align: center;
    color: black;
    padding: 10px 0 ;
    border-bottom:1px solid  #c9c9c9;
`
const Box = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    height: auto;
    border-bottom: 1px solid  #c9c9c9;
`
const OptionBox = styled.div`
    text-align: center;
    width: 350px;
    height: 40px;
    color: black;
    padding: 10px 0;
    border-radius: 8px;
    padding: 10px;
    margin: 4px;
    cursor: pointer;
    &:hover{
        background-color: #c9c9c9;
    }
`
const Foot = styled.div`
    margin-top: 20px;
    font-size: 14px;
    color:#c9c9c9;
    text-align: center;
`

export default function EditPost({closeModal, postId}){
    
    const deletePost = () =>{
        fetch(`http://localhost:8080/api/post/${postId}`,{
            method:'DELETE',
            credentials:'include'
        })
        .then((response)=>{
            if(response.status ==200){
                closeModal()
            }else{
                alert('다시 시도해주세요.')
            }
        })
    }

    return(
        <Wrap>
            <CloseDiv onClick={closeModal}></CloseDiv>
            <Conteiner>
                <Title>게시글 관리</Title>
                    <Box>
                        <OptionBox onClick={deletePost}>게시글 삭제</OptionBox>
                        <OptionBox onClick={closeModal} style={{color:'red'}}>취소</OptionBox> 
                    </Box>
                    <Foot>untity</Foot>
            </Conteiner>
        </Wrap>
    );
}