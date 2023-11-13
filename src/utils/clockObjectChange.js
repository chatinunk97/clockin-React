const clockObjectChange = (location,time,type,today)=>{
    if(type === "clockIn"){
        return {latitudeClockIn : location.lat , longitudeClockIn : location.lng , clockInTime : time , today}
    }
    else{
        return {latitudeClockOut : location.lat , longitudeClockOut : location.lng , clockOutTime : time}
    }

}

export default clockObjectChange