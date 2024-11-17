import styled from "styled-components"
import LoginInput from "../InputComponent/Login/logininput"
import { useEffect, useState } from "react"
import SearchInf from "../Search/searchComponent"
import { IoClose } from "react-icons/io5";
import Searching from "./searching";

const Wrap = styled.div`
    z-index: 1000;
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
`
const Conteiner = styled.div`
    z-index: 1001;
    width: 30%;
    min-width: 500px;
    min-height: 600px;
    height: 60%;
    background-color: white;
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
`
const CancleButton = styled.div`
    width: 26px;
    height: 26px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 10px 0 10px;
    cursor: pointer;
    &:hover{
        background-color: #e1e1e1;
    }
`
const Layer = styled.div`
    
`
const InfLayer = styled.div`
    width: 400px;
    height: auto;
    overflow: scroll;
`
const P = styled.h1`
    font-size: 24px;
    margin: 10px;
`
const Line = styled.span`
    width: 400px;
    margin: 8px 0 16px 0 ;
    border-top: 1px solid #d9d9d9;

`

export default function SearchModal({closeModal}){
    const [search , setSearch] = useState("")
    const [searchInf, setSearchInf] = useState([])
    const [searchState, setSearchState] = useState()
    const searching = (e) =>{
        const SEARCH = e.target.value;
        setSearch(SEARCH);
    }
    
    useEffect(()=>{
        const username = search;
        setSearchState(false)
        const getSearchInf = async() =>{
            const response = await fetch(`http://localhost:8080/api/users?username=${username}`)
            const result = await response.json()
            if(!result){
                return;
            }
            setSearchInf(result)
            console.log(searchInf)
            setSearchState(true)
        }
        if(username.length >= 1){
                getSearchInf(); 
        }else{
            setSearchInf([])
        }
       
    },[search])
    return(
        <Wrap>
            <Conteiner>
                <div style={{width:"100%", display:"flex", justifyContent:"right"}}>
                    <CancleButton onClick={closeModal}><IoClose size={24}/></CancleButton>
                </div>
                <P>검색</P>
                <Layer>
                    <LoginInput type="text" width="400px" height="40px" fontSize="18" padding="8px" placeholder="검색" value={search} onChange={searching} backgroundColor="#efefef"/>
                </Layer>
                <Line></Line>
                <InfLayer>
                    {searchInf.length == 0 ? null: searchState ? searchInf.map((item)=>(<SearchInf closeModal={closeModal} username={item.username} nickname={item.nickname} profilePhoto={item.profilePhoto}/>)):<Searching/>}
                </InfLayer>
            </Conteiner>
        </Wrap>
    )
}