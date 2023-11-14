const clockObjectChange = (location,time,type,today,reasonLocation)=>{
    console.log(reasonLocation)
    if(type === "clockIn"){
        return {latitudeClockIn : location.lat , longitudeClockIn : location.lng , clockInTime : time , today , reasonLocation }
    }
    else{
        return {latitudeClockOut : location.lat , longitudeClockOut : location.lng , clockOutTime : time}
    }

}

export default clockObjectChange