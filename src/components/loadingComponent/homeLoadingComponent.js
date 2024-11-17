import styled from "styled-components"
import LoginInput from "../InputComponent/Login/logininput";

const Box = styled.div`
    /* padding-left: 250px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1100px;
    height: auto;
    background-color: white;
`

const Wrap = styled.div`
    width: 500px;
    height: auto;
    border: 1px solid #d9d9d9;
    margin: 5px 0;
`
const ProfileLayer = styled.div`
    height: 60px;
    display: flex;
    justify-content: left;
    align-items: center;
`
const PhotoLayer = styled.div`
    width: 100%;
    height: 500px;
`
const ProfilePhoto = styled.div`
    width: 44px;
    height: 44px;
    border: 1px solid #d9d9d9;
    background-color: #d9d9d9;
    border-radius: 50%;
    margin: 0 10px;
    cursor: pointer;
`
const Username = styled.div`
    width: 150px;
    height: 20px;
    background-color: #d9d9d9;
    border-radius: 4px;
`
const Nickname = styled(Username)`
    margin-top: 5px;
`
const ArticleLayer = styled.div``
const InfLayer = styled.div`
    height: 40px;
    display: flex;
    justify-content: left;
    align-items: center;
`
const LikeButton = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
`
const Button = styled(InfLayer)`
    justify-content: center;
    height: 36px;
    width: 36px;
    border: none;
    border-radius: 8px;
    margin: 0 2px 0 10px;
    /* background-color: #d9d9d9; */
`
const Acticle = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    height: auto;
    flex-direction: column;
    margin: 0 10px;
`
const Div = styled.div`
    &[name="article"]{
        margin: 2px 0;
        font-size: 14px;
    }
`
const NicknameArea = styled.div`
    margin: 6px;
    border-radius: 4px;
    width: 100px;
    height: 20px;
    background-color:  #d9d9d9;
`



export default function HomeLoadingComponent(){
    
    return(
        <Box>
            <Wrap>
                <ProfileLayer>
                    <ProfilePhoto></ProfilePhoto>
                    <Div style={{display:"flex", flexDirection:"column",height:"100%",alignItems:"start", justifyContent:"center"}}>
                        <Username></Username>
                        <Nickname></Nickname>
                    </Div>
                </ProfileLayer>
                <PhotoLayer>
                    <div style={{width:"100%", height:"100%" , backgroundColor:"#d9d9d9"}}></div>
                </PhotoLayer>
                <ArticleLayer>
                    <InfLayer>
                        <LikeButton>
                            <Button >         
                            </Button>
                        </LikeButton>
                        <LikeButton>
                            <Button >
                            </Button>
                        </LikeButton>
                    </InfLayer>
                    <Acticle>
                        <Div name="article" ></Div>
                        <Div name="article" >
                            <NicknameArea ></NicknameArea>
                            <NicknameArea></NicknameArea>
                        </Div>
                        <Div>
                        </Div>
                            <LoginInput width="430px" height="30px" placeholder="" border="none" backgroundColor="#d9d9d9"/>
                    </Acticle>
                </ArticleLayer>
            </Wrap>
            <Wrap>
                <ProfileLayer>
                    <ProfilePhoto></ProfilePhoto>
                    <Div style={{display:"flex", flexDirection:"column",height:"100%",alignItems:"start", justifyContent:"center"}}>
                        <Username></Username>
                        <Nickname></Nickname>
                    </Div>
                </ProfileLayer>
                <PhotoLayer>
                    <div style={{width:"100%", height:"100%" , backgroundColor:"#d9d9d9"}}></div>
                </PhotoLayer>
                <ArticleLayer>
                    <InfLayer>
                        <LikeButton>
                            <Button >         
                            </Button>
                        </LikeButton>
                        <LikeButton>
                            <Button >
                            </Button>
                        </LikeButton>
                    </InfLayer>
                    <Acticle>
                        <Div name="article" ></Div>
                        <Div name="article" >
                            <NicknameArea ></NicknameArea>
                            <NicknameArea></NicknameArea>
                        </Div>
                        <Div>
                        </Div>
                            <LoginInput width="430px" height="30px" placeholder="" border="none" backgroundColor="#d9d9d9"/>
                    </Acticle>
                </ArticleLayer>
            </Wrap>
        </Box>
    )
}