import { create } from "zustand"

const useProfileStore = create((set)=>(
    {
        userProfile : {
            username: "",
            nickname: "",
            profileImage: null,
            followedCount: 0,
            followerCount: 0,
            postCount: 0,
            postImages: [],
        },
        
        getUserProfile : ()=>{
            fetch('http://localhost:8080/api/user',{
                credentials:'include'
            })
            .then((response)=>{
                if(response.ok){
                    return response.json()
                }else if(!response.ok){
                    console.log(response)
                    return;
                }
            })
            .then((response)=>{
                set(()=>({userProfile : response}))
                // localStorage.setItem("username",response.username);
            })
        },

        changeUserProfilePhoto : (newProfilePhoto) => {
            set((state)=>({
                userProfile: {
                    ...state.userprofile,
                    profileImage : newProfilePhoto
                }
            }))
        }

    }
))

export default useProfileStore;