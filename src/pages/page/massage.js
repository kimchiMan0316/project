import styled from "styled-components"

const Wrap = styled.div`
    padding-left: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1100px;
    height: auto;
    background-color: white;
`

export default function Message(){
    return(
       <Wrap>
            <div>메세지</div>
       </Wrap>
    )
}