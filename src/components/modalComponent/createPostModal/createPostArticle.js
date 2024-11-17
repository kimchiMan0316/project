import styled from "styled-components"
import useProfileStore from "../../../store/useProfile"
import nerd from "../../../assets/image/nerd.JPEG"
import { useState } from "react"

const Wrap = styled.div`
    width: 300px;
    height: 630px;
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const UserBox = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    align-items:center;
`
const ImageBox = styled.div`
    height: 30px;
    width: 30px;
    margin: 0 10px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Username = styled.div`
    font-weight: 700;
`
const ArticleArea = styled.textarea`
    width: 300px;
    height: 400px;
    padding: 10px;
    border: none;
    outline: none;
`


export default function CreatePostArticle(){
    const {userProfile } = useProfileStore()
    const [article, setArticle] = useState("")
    const user = userProfile.response;
    
    const handleArticle = (e) =>{
        setArticle(e.target.value)
    }

    return(
        <Wrap>
            <UserBox>
                <ImageBox>
                    <img src={nerd} style={{width:'100%',height:'100%'}}/>
                </ImageBox>
                <Username>{user.username}</Username>
            </UserBox>
            <ArticleArea placeholder="글을 작성해주세요..." value={article} onChange={handleArticle}>

            </ArticleArea>
        </Wrap>
    )
}