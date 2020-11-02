/**
 * 封装  本地存储模块
 * */  



 export const getItem=name=>{
    const data = window.localStorage.getItem(name)
    // 因为data可能不是json格式字符串，所以需要把JSON.parse()放到try catch中
    try{
        return JSON.parse(data) //将data转为js对象
    }catch(err){
        return data  //data不是json格式的字符串，直接返回
    }
 }

 export const setItem=(name,value)=>{
    //  如果value是对象，则把value转为json格式的字符串再存储
    if(typeof value==='object'){
       value=JSON.stringify(value)
    }
    window.localStorage.setItem(name,value)
 }

 export const removeItem=name=>{
    window.localStorage.removeItem(name)
 }