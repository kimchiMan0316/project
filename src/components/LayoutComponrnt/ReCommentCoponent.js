import styled from "styled-components"
import { formatTime } from "../../utills/formatTime"

import img from "../../assets/image/untityLogo.png"

const Wrap = styled.div`
    display:flex;
    align-items: start;
    height: auto;
    min-height: 30px;
    margin: 10px 0;
`
const ProfileImage = styled.div`
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid gray;
    border-radius: 50%;
`
const Profile= styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 10px;
`

export default function ReCommentComponent({item}){
    console.log(item)
    return(
        <Wrap>
            <ProfileImage>
                <img src={img} style={{width:"100%"}}/>
            </ProfileImage>
            <Profile>
                <div style={{display:'flex'}}>
                    <p style={{marginRight:'10px',fontWeight:'600'}}>{item.username}</p>
                    <p>{item.article}</p>
                </div>
                <div>
                    <p style={{fontSize:'14px',color:'gray'}}>{formatTime(item.date)}</p>
                </div>
            </Profile>
        </Wrap>
    )
}