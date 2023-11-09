const todayString = ()=>{
    const today = new Date();
    console.log(today);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    // Create the formatted date string
    return `${year}-${month}-${day}`;
}

export default todayString