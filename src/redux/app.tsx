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

//================================================================================================================

import axios, { AxiosResponse } from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { "API-KEY": "83df008c-c6eb-4d84-acd3-e62be0f407d9"}, });


export const usersApi = {
// INITIALISATION ------------------------------------------------------------------------------------------------------------ INITIALISATION
    setMeLogin (email:string,password:string,rememberMe:boolean=false,captcha:string=''){
             return instance.post(`/auth/login`,{email,password,rememberMe,captcha})   .then(res=>res).catch(err=>err)},
    // UNAUTHORISED -------------------------------------------------------------------------------------------------------------- UNAUTHORISED
    getLogIn()                   { return instance.get<GetLogIn_Type>(`/auth/me`)       .then(res=>res).catch(err=>err)},
    setMeLogOut()                { return instance.delete(`/auth/login`)                .then(res=>res.data)},
    getCaptcha()                 { return instance.get(`/security/get-captcha-url`)     .then(res=>res).catch(err=>err)},
 // PROFILE ------------------------------------------------------------------------------------------------------------------- PROFILE
    getProfile(userId:number)    { return instance.get<ProfileData_Type>(`profile/${userId}`)      },
    getStatus(userId:number)     { return instance.get<string>(`profile/status/${userId}`)         },
    updateMyStatus(status:string){ return instance.put<string>(`profile/status`,{status: status})  },
    updateMyAvatar(file:string)  { const formData = new FormData(); formData.append('image', file);
        return instance.put<UpdateMyAva_Type>(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })},
// FRIENDS ------------------------------------------------------------------------------------------------------------------- FRIENDS
    getMyFriends()               { return instance.get<UsersListData_Type>(`users?friend=true&count=50`)        /* .then(res=>res).catch(err=>err) */},
// DIALOGS ------------------------------------------------------------------------------------------------------------------- DIALOGS
    getMyNegotiatorsList ()      { return instance.get<DialogsList_Type[]>(`dialogs`)                  },
    getTalkWithUser (userId:number,msgCount:number=20,pageNumber:number=1)
        { return instance.get<CertainDialog_Type>(`dialogs/${userId}/messages?count=${msgCount}&page=${pageNumber}`) },
    sendMsgToTalker(userId:number,body:string) { return instance.post<SendMsgToTalker_Type>(`dialogs/${userId}/messages`,{body})},
    getNewMessages ()            { return instance.get<number>(`dialogs/messages/new/count`) },
    deleteMessage  (messageId:string)   { return instance.delete<DeleteMSG_Type> (`dialogs/messages/${messageId}`)},
    setAsSpamMessage(messageId:string)  { return instance.post<SetAsSpamMSG_Type>(`dialogs/messages/${messageId}/spam`) },
// USERS --------------------------------------------------------------------------------------------------------------------- USERS
    getUsers(pageSize =10,currentPage=1){ return instance.get<UsersListData_Type>(`users?count=${pageSize}&page=${currentPage}`)},
    getCertainUser(pageSize:number|null, userName:string,pageOfEquals:number=1)
    {return instance.get<UsersListData_Type>(`users?count=${pageSize}&term=${userName}&page=${pageOfEquals}`) },
    followRequest  (userId:number)      { return instance.post<Un_Follow_Type>(`follow/${userId}`)    },
    unFollowRequest(userId:number)      { return instance.delete<Un_Follow_Type>(`follow/${userId}`)  },
};

type UpdateMyAva_Type = { data:{ photos:{ small:string,large:string } } }

export type ProfileData_Type = {
    aboutMe: null|string
    contacts:{facebook:string,github:string,instagram:string,mainLink:string,twitter:string,vk:string,website:string,youtube:string}
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: null|string
    photos: {small:null|string,large:null|string}
    userId: number
}
export type GetLogIn_Type = {
    data: {id:number,email:string,login:string}
    resultCode:number
    messages: Array<string>
    message:string
} 
export type DialogsList_Type = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string
    lastUserActivityDate:   string
    newMessagesCount: number
    photos: {small:null|string, large: null|string}
    userName: string
}
export type MessageData_Type = {
    addedAt: string
    body: string
    id: string
    recipientId: number
    senderId: number
    translatedBody: null|boolean
    viewed: boolean
}
export type CertainDialog_Type = {
    error?: null | string
    items: MessageData_Type[]
    totalCount?: number
}
type SendMsgToTalker_Type = {
    data:{
        message: {
            addedAt: string
            body: string
            deletedByRecipient: boolean
            deletedBySender: boolean
            distributionId: null
            id: string
            isSpam: boolean
            recipientId: number
            recipientName: string
            senderId: number
            senderName: string
            translatedBody: null
            viewed: boolean
        }
    }
}
export type UsersArr = {
    error:string
    followed: boolean
    id: number | any // в Users в jsx почему-то ругается если оставить number при мапинге
    name: string
    photos: {small:string|null,large:string|null}
    status: null|string
    uniqueUrlName: null
    }
type UsersListData_Type = {
    error: null
    items: UsersArr[]
    totalCount: number
}
type DeleteMSG_Type = {}
type SetAsSpamMSG_Type = {}
type Un_Follow_Type = {}

// usersApi.getLogIn().then((asd:AxiosResponse<number>)=> asd.data.) 

//================================================================================================================



// import axios from "axios";  //- last version

// const instance = axios.create({
//     withCredentials: true,
//     baseURL: 'https://social-network.samuraijs.com/api/1.0/',
//     headers: { "API-KEY": "83df008c-c6eb-4d84-acd3-e62be0f407d9"}, });

// export const usersApi = {
//     // INITIALISATION ------------------------------------------------------------------------------------------------------------ INITIALISATION
//     setMeLogin (email:string,password:string,rememberMe:boolean=false,captcha:string='')
//             {return instance.post(`/auth/login`,{email,password,rememberMe,captcha})   .then(res=>res).catch(err=>err)},
//     // UNAUTHORISED -------------------------------------------------------------------------------------------------------------- UNAUTHORISED
//     setMeLogOut()                   { return instance.delete(`/auth/login`)                .then(res=>res.data)},
//     getLogIn()                      { return instance.get(`/auth/me`)                      .then(res=>res).catch(err=>err)},
//     getCaptcha()                    { return instance.get(`/security/get-captcha-url`)     .then(res=>res).catch(err=>err)},
//     // PROFILE ------------------------------------------------------------------------------------------------------------------- PROFILE
//     getProfile(userId:number)       { return instance.get(`profile/${userId}`)             .then(res=>res).catch(err=>err)},
//     getStatus(userId:number)        { return instance.get(`profile/status/${userId}`)      .then(res=>res).catch(err=>err)},
//     updateMyStatus(status:string)   { return instance.put(`profile/status`,{status: status})
//                                                                                            .then(res=>res).catch(err=>err)},
//     updateMyAvatar(file:string)     { const formData = new FormData(); formData.append('image', file);
//         return instance.put(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' }
//         })                                                                                  .then(res=>res).catch(err=>err)},
//     // FRIENDS ------------------------------------------------------------------------------------------------------------------- FRIENDS
//     getMyFriends()               { return instance.get(`users?friend=true&count=50`)        .then(res=>res).catch(err=>err)},
//     // DIALOGS ------------------------------------------------------------------------------------------------------------------- DIALOGS
//     getMyNegotiatorsList ()      { return instance.get(`dialogs`)                           .then(res=>res).catch(err=>err)},
//     getTalkWithUser (userId:number,msgCount:number=20,pageNumber:number=1)
//     { return instance.get(`dialogs/${userId}/messages?count=${msgCount}&page=${pageNumber}`)
//                                                                                             .then(res=>res).catch(err=>err)},
//     sendMsgToTalker(userId:number,body:string) { return instance.post(`dialogs/${userId}/messages`,{body})
//                                                                                             .then(res=>res).catch(err=>err)},
//     getNewMessages ()            { return instance.get(`dialogs/messages/new/count`)        .then(res=>res).catch(err=>err)},
//     deleteMessage  (messageId:string)   { return instance.delete(`dialogs/messages/${messageId}`)
//                                                                                             .then(response => response.data  )},
//     setAsSpamMessage(messageId:string)  { return instance.post(`dialogs/messages/${messageId}/spam`)
//                                                                                             .then(response => response.data  )},
//     // USERS --------------------------------------------------------------------------------------------------------------------- USERS
//     getUsers(pageSize =10,currentPage=1){
//         return instance.get(`users?count=${pageSize}&page=${currentPage}`)                 .then(res=>res).catch(err=>err)},
//     getCertainUser(pageSize:number|null, userName:string,pageOfEquals:number=1)
//     {return instance.get(`users?count=${pageSize}&term=${userName}&page=${pageOfEquals}`)  .then(res=>res).catch(err=>err)},
//     followRequest  (userId:number)      { return instance.post(`follow/${userId}`)         .then(res=>res).catch(err=>err)},
//     unFollowRequest(userId:number)      { return instance.delete(`follow/${userId}`)       .then(res=>res).catch(err=>err)},
// };

