import { create } from 'zustand';

const useStore = create((set) => ({
  offset: 0,
  post: [ ],
  
  getPost : () => set((state)=>({post : [ ...state.post, '박설호']})),
  deletePost : () => set(()=>({post : [ ]}))
}));


export default useStore;