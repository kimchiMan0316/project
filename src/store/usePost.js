import { create } from "zustand"

const usePost = create((set)=>(
    {
        post: [],
        offset: 0,

        getPost : ()=>{ 
            fetch(`http://localhost:8080/api/home/${usePost.getState().offset}`,{
                credentials:'include'
            })
            .then((response)=>{
                if (!response.ok) {
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                    return;
                }
                return response.json()
            })
            .then((data)=>{
                if(!data){
                    return
                }
                console.log(data)
                set((state)=>({post: [...state.post,...data]}))
                set((state)=>({offset : state.offset + 10}))
            })
        },

    }
))

export default usePost;