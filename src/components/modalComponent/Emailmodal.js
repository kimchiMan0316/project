import styled from "styled-components";

const Wrap = styled.div`
    z-index: 1000;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.4);
`
const Conteiner = styled.form`
    z-index: 1001;
    width: 400px;
    height: 500px;
    border-radius: 10px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`
const Main = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const P = styled.span`
    text-align: center;
    margin: 10px;
    &[name="cancle"]{
        text-align: right;
        font-weight: 600;
        font-size: 18px;
        margin: 10px;
        cursor: pointer;
    }
    &[name="title"]{
        font-size: 24px;
        font-weight: 500;
    }
`
const Foot = styled(Main)`
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #4e5968;
`

export default function Modal({width, height, title, content, closeModal, onSubmit}){
    const style = {
        width: width,
        height: height,
    }
    return(
        <Wrap>
            <Conteiner style={style} onSubmit={onSubmit}>
                <div style={{width:"100%", display:"flex", justifyContent:"right"}}>
                    <P name="cancle" onClick={closeModal}>X</P>
                </div>
                <Main>
                    <P name="title">{title}</P>
                    {content}
                </Main> 
                <Foot>
                    untity2
                </Foot>
            </Conteiner>
        </Wrap>
    );
}