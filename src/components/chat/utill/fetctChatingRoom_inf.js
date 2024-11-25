export const chatRoomInf = async(Number) => {
    const response = await fetch(`http://localhost:8080/api/chatroom/${Number}`,
        {
            credentials:'include',
        }
    )
    const result = await response.json();
    return result
}