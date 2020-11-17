/**
 * 文章评论相关请求模块
 * */ 


import request from '../utils/request.js'


/**
 * 获取文章评论列表
 * */  
export const getComments=params=>{
    return request({
        method:'GET',
        url:'/app/v1_0/comments',
        params
    })
}


/**
 * 对评论点赞
 * */  
export const addCommentLike=commentId=>{
    return request({
        method:'POST',
        url:'/app/v1_0/comment/likings',
       data:{
           target:commentId
       }
    })
}


/**
 * 取消对评论的点赞
 * */  
export const deleteCommentLike=commentId=>{
    return request({
        method:'DELETE',
        url:`/app/v1_0/comment/likings/${commentId}`,
    })
}
/**
 * 添加评论或评论回复
 * */  
export const addComment=data=>{
    return request({
        method:'POST',
        url:`/app/v1_0/comments`,
        data
    })
}