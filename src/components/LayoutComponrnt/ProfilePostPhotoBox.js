import styled from "styled-components";
import { IoMdPhotos } from "react-icons/io";
import { useState } from "react";
import Screen from "../modalComponent/screenModal";

const Wrap = styled.div`
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    overflow: hidden;
    gap: 1px;
`
const PostImageBox = styled.div`
    position: relative;
    background-color: #1b1d23;
    width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    &:hover{
        opacity: 0.7;
    }
`
const Img = styled.img`
    max-width: 250px;
    max-height: 250px;
`
const Icon = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    color: black;
`


// 사진을 클릭하면 해당페이지로 이동하기
export default function ProfilePostPhotoBox({postImage}){
    const [ modal, setModal] = useState(false)
    const [ post, setPost ] = useState()
    const [ imageStyles , setImageStyles] = useState({})
    
    console.log('props',postImage)

    const getPostInf = (e)=>{
        const postId = e.target.id;
        fetch(`http://localhost:8080/api/post/${postId}`,{
            credentials:'include'
        })
        .then((response)=>{
            if(response){
                return response.json()
            }else{
                console.log('error')
            }
        })
        .then((response)=>{
            setPost(response)
            console.log(response)
            setModal(true)
        })
    }

    const onLoadImg = (e) =>{
        const { naturalHeight, naturalWidth } = e.target;
        
        const newStyle = 
            naturalHeight> naturalWidth
            ? { height: '100%', width: 'auto' }
            : naturalHeight < naturalWidth
            ? { height: 'auto', width: '100%' }
            : { width: '100%', height: '100%' };

            setImageStyles((prevStyles)=>({
                ...prevStyles,
                [e.target.id] : newStyle,
            }));
        
    }
    
    const closeModal = () =>{
        setModal(false)
        setPost({})
    }
    return(
        <Wrap>
            {postImage.map((item)=>
                (<PostImageBox key={item.postId}>
                    <Img src={item.postImage} alt="error" onClick={getPostInf} style={imageStyles[item.postId]}  onLoad={onLoadImg} id={item.postId}/>
                    {item.mixed ? <Icon>< IoMdPhotos size={20} opacity={0.7} color="white"/></Icon>:null}
                </PostImageBox>))}
                {modal ? <Screen closeScreen={closeModal} post={post}/>:null}
        </Wrap>
    );
}