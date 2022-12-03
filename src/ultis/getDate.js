function checkTime(i) 
{
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
const getDate = ()=>{
    let today = new Date();
    let date = today.getFullYear()+"-"+checkTime((today.getMonth()+1))+"-"+checkTime(today.getDate())+" "+ checkTime(today.getHours())+":"+checkTime(today.getMinutes())+":"+checkTime(today.getSeconds())
    return date
}

//console.log(getDate())
module.exports = {getDate}