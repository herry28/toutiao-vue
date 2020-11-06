/**
 * 频道相关请求模块
 * */ 


import request from '../utils/request.js'


/**
 * 获取所有频道列表
 * */  
export const getAllChannels=()=>{
    return request({
        method:'GET',
        url:'/app/v1_0/channels',
    })
}

/**
 * 持久化  添加用户频道
 * */  
export const addUserChannels=data=>{
    return request({
        method:'PATCH',
        url:'/app/v1_0/user/channels',
        data
    })
}

/**
 * 持久化  删除用户频道
 * */  
export const deleteUserChannels=channelId=>{
    return request({
        method:'DELETE',
        url:`/app/v1_0/user/channels/${channelId}`,
        data
    })
}
