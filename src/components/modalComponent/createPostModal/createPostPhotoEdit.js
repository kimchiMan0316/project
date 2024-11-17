import styled from "styled-components"

const Wrap = styled.div`
    position: relative;
    width: 680px;
    height: 630px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Img = styled.img`
    width: 100%;
    background-color: black;
    max-height: 660px;
`

export default function EditPhoto({photos}){
    return(
        <Wrap>
            
            <Img src={photos}/>
        </Wrap>
    )
}