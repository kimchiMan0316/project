import styled from "styled-components"

const Wrap = styled.div`
    height: 50px;
    width: 400px;
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    border-radius: 8px;
    cursor: pointer;
    
`
const PhotoArea = styled.div`
    background-color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #d9d9d9;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 10px;
`
const UserInf = styled.div`
    display: flex;
    flex-direction: column;
`

const P = styled.p`
    width: 100px;
    height: 17px;
    border-radius: 4px;
    background-color: #d9d9d9;
    font-size: 14px;
    &[name="username"]{
        font-size: 17px;
        font-weight: 600;
        margin-bottom: 4px;
    }

`


export default function Searching(){
    return(
        <>
        <Wrap>
            <PhotoArea>
            </PhotoArea>
            <UserInf>
                <P name="username"></P>
                <P name="nickname"></P>
            </UserInf>
        </Wrap>
        <Wrap>
            <PhotoArea>
            </PhotoArea>
            <UserInf>
                <P name="username"></P>
                <P name="nickname"></P>
            </UserInf>
        </Wrap>
        <Wrap>
            <PhotoArea>
            </PhotoArea>
            <UserInf>
                <P name="username"></P>
                <P name="nickname"></P>
            </UserInf>
        </Wrap>
        <Wrap>
            <PhotoArea>
            </PhotoArea>
            <UserInf>
                <P name="username"></P>
                <P name="nickname"></P>
            </UserInf>
        </Wrap>
        <Wrap>
            <PhotoArea>
            </PhotoArea>
            <UserInf>
                <P name="username"></P>
                <P name="nickname"></P>
            </UserInf>
        </Wrap>
        <Wrap>
            <PhotoArea>
            </PhotoArea>
            <UserInf>
                <P name="username"></P>
                <P name="nickname"></P>
            </UserInf>
        </Wrap>
        <Wrap>
            <PhotoArea>
            </PhotoArea>
            <UserInf>
                <P name="username"></P>
                <P name="nickname"></P>
            </UserInf>
        </Wrap>
       </>
    )
}