import styled from "styled-components"
import HomeContentsBox from "../../components/LayoutComponrnt/HomeContentsBox"
import usePost from "../../store/usePost"
import { useEffect, useState } from "react";
import useScrollStore from "../../store/useScrollStore";
import HomeLoadingComponent from "../../components/loadingComponent/homeLoadingComponent";

const Wrap = styled.div`
    padding-left: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1100px;
    height: auto;
    background-color: white;
    transition: all 0.3s ease-in-out;
`

export default function Home(){
    const {post, getPost} = usePost();
    const { scrollY, setScrollY } = useScrollStore();
    const [loading, setLoading] = useState(false);
    const [offset, setoffset]=useState(0)

    const offsetChange = () =>{
        setoffset((prev)=>prev+10)
    }
    
    useEffect(()=>{
        getPost();
        setLoading(true)
    },[])

    // 스크롤에 문제가 있음 로딩컴포넌트 스크롤기준으로 재랜더링 돼서 오류가 생김
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [setScrollY]);

    useEffect(() => {
        window.scrollTo(0, scrollY);
    }, [scrollY]);

    return(
        <Wrap>
            {/* <button onClick={offsetChange}>버튼</button> */}
            {post ? post.map((item)=>(<HomeContentsBox key={item.id} item={item}/>)):<HomeLoadingComponent/>}
        </Wrap>
    )
}