import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { "API-KEY": "cdecfb60-b246-4646-a72b-2c15c6b80db7"}, });

export const usersApi = {
    getLogIn()                   { return instance.get(`/auth/me`).then(response => response.data) },
    getUsers(pageSize = 10, currentPage = 1) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`).then(response => response.data)},
    followRequest(userId)        { return instance.post(`follow/${userId}`).then(response => response.data)},
    unFollowRequest(userId)      { return instance.delete(`follow/${userId}`).then(response => response.data)},
    getProfile(userId)           { return instance.get(`profile/${userId}`) },
    updateMyStatus(status)       { return instance.put(`profile/status`, {status: status} ).then(response =>
         response.config.data)},
    getMyStatus()                { return instance.get(`profile/status/8856`).then(response => response.data) },
    updateMyAvatar(file)         {
        const formData = new FormData();
        formData.append('image', file);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)},
    getMyProfile()               { return instance.get(`profile/8856`).then(response => response.data       )}
};



// ссылки для тестирования

// https://social-network.samuraijs.com/api/1.0/auth/me
// https://social-network.samuraijs.com/api/1.0/profile/8856
// https://social-network.samuraijs.com/api/1.0/profile
// https://social-network.samuraijs.com/api/1.0/profile/status/8856
// https://social-network.samuraijs.com/api/1.0/profile/photo
// https://social-network.samuraijs.com/activecontent/images/users/8856/user.jpg - аватарка большая
// https://social-network.samuraijs.com/activecontent/images/users/8856/user-small.jpg - аватарка мелкая