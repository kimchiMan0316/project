export const fetchProfileInf = async({params}) =>{
    const username = params.username;
    const storeUsername = localStorage.getItem('username');
    if(!username || storeUsername == username){
        const response = await fetch("http://localhost:8080/api/user",{
          credentials:"include"
        });
        const result = await response.json()
        return result;
      }else{
      const response = await fetch(`http://localhost:8080/api/user?username=${username}`,{
        credentials:"include"
      });
      if (!response.ok) {
        throw new Response('프로필을 불러오지 못했습니다.', { status: response.status });
      }
      const data = await response.json();
      return data; 
        }
}