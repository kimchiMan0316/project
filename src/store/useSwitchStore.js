import { create } from "zustand";

const useSwitchStore = create((set)=>({
    option : ["home","search","chat",'createPost',"profile"],
    currentSwitch : "home",
    setSwitch : (option)=>set(()=>({currentSwitch : option})),
}))

export default useSwitchStore;