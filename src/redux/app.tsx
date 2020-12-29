// import * as axios from "axios";
//
// const instance = axios.create({
//     withCredentials: true,
//     baseURL: 'https://social-network.samuraijs.com/api/1.0/',
//     headers: { "API-KEY": "83df008c-c6eb-4d84-acd3-e62be0f407d9"}, });
//
// export const usersApi = {
//     // INITIALISATION ------------------------------------------------------------------------------------------------------------ INITIALISATION
//     setMeLogin (email=null,password=null,rememberMe=false)
//                                  { return instance.post(`/auth/login`,{email,password,rememberMe})
//                                                                                            .then(res=>res).catch(err=>err)},
//     // UNAUTHORISED -------------------------------------------------------------------------------------------------------------- UNAUTHORISED
//     setMeLogOut()                { return instance.delete(`/auth/login`)                   .then(res=>res.data)},
//     getLogIn()                   { return instance.get(`/auth/me`)                         .then(res=>res).catch(err=>err)},
//     // PROFILE ------------------------------------------------------------------------------------------------------------------- PROFILE
//     getProfile(userId)           { return instance.get(`profile/${userId}`)                .then(res=>res).catch(err=>err)},
//     getStatus(userId)            { return instance.get(`profile/status/${userId}`)         .then(res=>res).catch(err=>err)},
//     updateMyStatus(status)       { return instance.put(`profile/status`,{status: status})  .then(res=>res).catch(err=>err)},
//     updateMyAvatar(file)         { const formData = new FormData(); formData.append('image', file);
//         return instance.put(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' }
//         })                                                                                 .then(res=>res).catch(err=>err)},
//     // FRIENDS ------------------------------------------------------------------------------------------------------------------- FRIENDS
//     getMyFriends()               { return instance.get(`users?friend=true&count=50`)       .then(res=>res).catch(err=>err)},
//     // DIALOGS ------------------------------------------------------------------------------------------------------------------- DIALOGS
//     getMyNegotiatorsList ()      { return instance.get(`dialogs`)                          .then(res=>res).catch(err=>err)},
//     getTalkWithUser (userId,msgCount=20,pageNumber=1)
//     { return instance.get(`dialogs/${userId}/messages?count=${msgCount}&page=${pageNumber}`)
//         .then(res=>res).catch(err=>err)},
//     sendMsgToTalker(userId,body) { return instance.post(`dialogs/${userId}/messages`,{body}).then(res=>res).catch(err=>err)},
//
//     getNewMessages ()            { return instance.get(`dialogs/messages/new/count`)        .then(res=>res).catch(err=>err)},
//     deleteMessage  (messageId)   { return instance.delete(`dialogs/messages/${messageId}`)
//                                                                                             .then(response => response.data  )},
//     setAsSpamMessage(messageId)  { return instance.post(`dialogs/messages/${messageId}/spam`)
//                                                                                             .then(response => response.data  )},
//     // USERS --------------------------------------------------------------------------------------------------------------------- USERS
//     getUsers(pageSize =10,currentPage=1){
//         return instance.get(`users?count=${pageSize}&page=${currentPage}`)                  .then(res=>res).catch(err=>err)},
//
//     getCertainUser(pageSize, userName,pageOfEquals=1)
//     { return instance.get(`users?count=${pageSize}&term=${userName}&page=${pageOfEquals}`)  .then(res=>res).catch(err=>err)},
//
//     followRequest  (userId)      { return instance.post(`follow/${userId}`)                 .then(res=>res).catch(err=>err)},
//     unFollowRequest(userId)      { return instance.delete(`follow/${userId}`)               .then(res=>res).catch(err=>err)},
// };

// ссылки для тестирования

// https://social-network.samuraijs.com/api/1.0/auth/me
// https://social-network.samuraijs.com/api/1.0/profile/8856
// https://social-network.samuraijs.com/api/1.0/profile
// https://social-network.samuraijs.com/api/1.0/profile/status/8856
// https://social-network.samuraijs.com/api/1.0/profile/photo
// https://social-network.samuraijs.com/activecontent/images/users/8856/user.jpg - аватарка большая
// https://social-network.samuraijs.com/activecontent/images/users/8856/user-small.jpg - аватарка мелкая
// https://social-network.samuraijs.com/api/1.0/profile/status/8856
// https://social-network.samuraijs.com/api/1.0/users?term=Stas9n
// https://social-network.samuraijs.com/api/1.0/users?friend
// https://social-network.samuraijs.com/api/1.0/dialogs
// https://social-network.samuraijs.com/api/1.0/dialogs/messages/new/count
// https://social-network.samuraijs.com/api/1.0/dialogs/7180/messages?count=5&page=3
// https://social-network.samuraijs.com/api/1.0/security/get-captcha-url                    Каптча


import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { "API-KEY": "83df008c-c6eb-4d84-acd3-e62be0f407d9"}, });

export const usersApi = {
    // INITIALISATION ------------------------------------------------------------------------------------------------------------ INITIALISATION
    setMeLogin (email:string,password:string,rememberMe:boolean=false,captcha:string='')
            {return instance.post(`/auth/login`,{email,password,rememberMe,captcha})   .then(res=>res).catch(err=>err)},
    // UNAUTHORISED -------------------------------------------------------------------------------------------------------------- UNAUTHORISED
    setMeLogOut()                   { return instance.delete(`/auth/login`)                .then(res=>res.data)},
    getLogIn()                      { return instance.get(`/auth/me`)                      .then(res=>res).catch(err=>err)},
    getCaptcha()                    { return instance.get(`/security/get-captcha-url`)     .then(res=>res).catch(err=>err)},
    // PROFILE ------------------------------------------------------------------------------------------------------------------- PROFILE
    getProfile(userId:number)       { return instance.get(`profile/${userId}`)             .then(res=>res).catch(err=>err)},
    getStatus(userId:number)        { return instance.get(`profile/status/${userId}`)      .then(res=>res).catch(err=>err)},
    updateMyStatus(status:string)   { return instance.put(`profile/status`,{status: status})
                                                                                           .then(res=>res).catch(err=>err)},
    updateMyAvatar(file:string)     { const formData = new FormData(); formData.append('image', file);
        return instance.put(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' }
        })                                                                                  .then(res=>res).catch(err=>err)},
    // FRIENDS ------------------------------------------------------------------------------------------------------------------- FRIENDS
    getMyFriends()               { return instance.get(`users?friend=true&count=50`)        .then(res=>res).catch(err=>err)},
    // DIALOGS ------------------------------------------------------------------------------------------------------------------- DIALOGS
    getMyNegotiatorsList ()      { return instance.get(`dialogs`)                           .then(res=>res).catch(err=>err)},
    getTalkWithUser (userId:number,msgCount:number=20,pageNumber:number=1)
    { return instance.get(`dialogs/${userId}/messages?count=${msgCount}&page=${pageNumber}`)
                                                                                            .then(res=>res).catch(err=>err)},
    sendMsgToTalker(userId:number,body:string) { return instance.post(`dialogs1/${userId}/messages`,{body})
                                                                                            .then(res=>res).catch(err=>err)},
    getNewMessages ()            { return instance.get(`dialogs/messages/new/count`)        .then(res=>res).catch(err=>err)},
    deleteMessage  (messageId:number)   { return instance.delete(`dialogs/messages/${messageId}`)
                                                                                            .then(response => response.data  )},
    setAsSpamMessage(messageId:number)  { return instance.post(`dialogs/messages/${messageId}/spam`)
                                                                                            .then(response => response.data  )},
    // USERS --------------------------------------------------------------------------------------------------------------------- USERS
    getUsers(pageSize =10,currentPage=1){
        return instance.get(`users?count=${pageSize}&page=${currentPage}`)                 .then(res=>res).catch(err=>err)},
    getCertainUser(pageSize:number|null, userName:string,pageOfEquals:number=1)
    {return instance.get(`users?count=${pageSize}&term=${userName}&page=${pageOfEquals}`)  .then(res=>res).catch(err=>err)},
    followRequest  (userId:number)      { return instance.post(`follow/${userId}`)         .then(res=>res).catch(err=>err)},
    unFollowRequest(userId:number)      { return instance.delete(`follow/${userId}`)       .then(res=>res).catch(err=>err)},
};
