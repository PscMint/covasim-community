export const getDaysBetweenDates=(date1, date2)=> {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
export const formatDate = (date)=> {
    if(date instanceof Date){
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        return year + '-' + month + '-' + day;
    }
    else{
        return date;
    }
}
export const toFloatNumber = (value) => {
    if(typeof value==="number")
        return value;
    // 清除"数字"和"."以外的字符
    value = value.replace(/[^\d.]/g,"");
    // 清除开头的"."
    value = value.replace(/^\./g,"");
    // 将超过两位小数以外的数字替换为字符"."
    value = value.replace(/\.{2,}/g,".");
    // 除了第一个小数点以后，后面的小数点全部替换为空
    value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    // 只能输入六位小数
    value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/,'$1$2.$3');
    //如果没有小数点，首位不能为类似于 01、02的数字
    if(value.indexOf(".")< 0 && value !=""){
        if(value.substr(0,1) == '0' && value.length == 2){
            value= value.substr(1,value.length);
        }
    }
    return parseFloat(value)
}
