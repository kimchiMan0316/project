export const formatTime = (time) =>{
    const DATE = time || "" 
    const DATES = DATE.replace(/[-:T]/g, '').slice(0, 14); 
    
    const YEAR = Number(DATES.slice(0,4))
    const MONTH = Number(DATES.slice(4,6))
    const DAY = Number(DATES.slice(6,8))
    const HOUR = Number(DATES.slice(8,10))
    const MINUTE = Number(DATES.slice(10,12))
    // const SCCOND = Number(DATES.slice(12,14))
    // console.log(YEAR,MONTH, DAY,HOUR,MINUTE ,SCCOND )

    const date = new Date;
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();
    // const second = date.getSeconds();
    // console.log(year, month, day,hour,minute, second)

    let nowTime;

    
    // 수정해야함 날짜 오류 


    if(year-YEAR!==0){
        nowTime = `${year-YEAR}년`
    }else if(month-MONTH !==0){
        nowTime = `${(month-MONTH)*4}주`
    }else if(day-DAY>6&&day-DAY<28){
        nowTime = `${(day-DAY)}주`
    }else if(day-DAY!=0){
        nowTime = `${day-DAY}일`
    }else if(hour-HOUR !== 0){
        nowTime = `${hour-HOUR}시간`
    }else if(minute-MINUTE!==0){
        nowTime = `${minute-MINUTE}분`
    }else {
        nowTime = "방금전"
    }
    // console.log(nowTime);
    return nowTime;
}

