const timeSince=(date:Date)=>{
    date=new Date(date)    
    const seconds=Math.floor((Date.now()-date.getTime())/1000)
    const intervals:any={
        year:365*24*60*60,
        month:30*24*60*60,
        day:24*60*60,
        hour:60*60,
        minute:60,
        second:1
    }
    for(const key in intervals){
        const value=intervals[key]
        const count=Math.floor(seconds/value)

        if(count>=1){
            return `${count} ${key}${count > 1 ? 's' : ""} ago`;
        }
    }
}

export {timeSince}