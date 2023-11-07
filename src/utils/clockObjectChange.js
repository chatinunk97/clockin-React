const clockObjectChange = (location,time,type)=>{
    if(type === "clockIn"){
        return {latitudeClockIn : location.lat , longitudeClockIn : location.lng , clockInTime : time}
    }
    else{
        return {latitudeClockOut : location.lat , longitudeClockOut : location.lng , clockOutTime : time}
    }

}

export default clockObjectChange