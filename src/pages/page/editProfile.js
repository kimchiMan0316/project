import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "../../components/LayoutComponrnt/LayoutComponent";
import nerd from "../../assets/image/nerd.JPEG";

const Wrap = styled.div`
    padding-left: 250px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 1100px;
    height: auto;
    margin-top: 20px;
    background-color: white;
`
const Title = styled.p`
    font-size: 20px;
    font-weight: 600;
`
const Conteiner = styled.div`
    /* background-color: aliceblue; */
    display: flex;
    width: 90%;
    height: 300px;
    align-items: center;
    justify-content: center;
`
const Box = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    height: 100%;
    align-items: center;
`
const ImageArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50%;
`
const Image = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
`
const UserInf = styled(ImageArea)`
    display: flex;
    flex-direction: column;
    align-items:start;
    justify-content: center;
`
const P = styled.p`
    font-size: 15px;
    margin-bottom: 4px;
    font-weight: 500;
    color: #34353b;
`
const Input = styled.input`
    margin-bottom: 10px;
    width: 240px;
    padding: 4px 2px;
    border: none;
    outline: none;
`
const Conteiner2 = styled(Conteiner)`
    border-top: 2px solid #7e7e7e;
    background-color: aliceblue;
`
export default function EditProfile(){
    const userinf = useLoaderData();
    console.log(userinf)
    return(
        <Wrap>
            <Title>프로필 설정</Title>
            <Conteiner>
                <Box>
                    <ImageArea>
                        <Image>
                            <img src={nerd} style={{width:'100%',height:'100%'}}/>
                        </Image>
                    </ImageArea>
                    <UserInf>
                        <P>이름</P>
                        <Input placeholder={userinf.username}/>
                        <P>닉네임</P>
                        <Input placeholder={userinf.nickname}/>
                        <P>메세지</P>
                        <Input placeholder={userinf.message ? "":"자신을 소개해봐요!"}/>
                    </UserInf>
                </Box>
            </Conteiner>
            <Conteiner2>
                
            </Conteiner2>
            <Footer/>
        </Wrap>
    );
}