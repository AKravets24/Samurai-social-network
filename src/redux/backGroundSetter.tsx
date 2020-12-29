// // backGround picture
// import backDropPIC_N    from "./img/backGroundThemes/night.jpg";
// import backDropPIC_M    from "./img/backGroundThemes/morning.png";
// import backDropPIC_D    from "./img/backGroundThemes/day.jpg";
// import backDropPIC_E    from "./img/backGroundThemes/evening.jpg";
//
// // generalAuthorizationLoader
// import auth_LDR_GIF_N   from './loader/ifAuthorization/nightLoader.gif';
// import auth_LDR_GIF_M   from './loader/ifAuthorization/morningLoader.gif';
// import auth_LDR_GIF_D   from './loader/ifAuthorization/dayLoader.gif';
// import auth_LDR_GIF_E   from './loader/ifAuthorization/eveningLoader.gif';
//
// // ProfilePanoramaPic
// import panoramaPIC_N      from "./img/profilePic/summerNight.jpg";
// import panoramaPIC_M      from "./img/profilePic/summerMorning.jpg";
// import panoramaPIC_D      from "./img/profilePic/summerDay.jpg";
// import panoramaPIC_E      from "./img/profilePic/summerEvening.jpg";
//
// // ProfilePanoramaGIF
// import panoramaGIF_N      from './loader/profile/panoramaN.gif'
// import panoramaGIF_M      from './loader/profile/panoramaM.gif'
// import panoramaGIF_D      from './loader/profile/panoramaD.gif'
// import panoramaGIF_E      from './loader/profile/panoramaE.gif'
//
// // ProfileAvaLoaderGIF
// import ava_LDR_GIF_N      from './loader/profile/avaN.gif';
// import ava_LDR_GIF_M      from './loader/profile/avaM.gif';
// import ava_LDR_GIF_D      from './loader/profile/avaD.gif';
// import ava_LDR_GIF_E      from './loader/profile/avaE.gif';
//
// // ProfileBTNLoaderGIF
// import BTN_LDR_GIF_N      from './loader/profile/BTNN.gif';
// import BTN_LDR_GIF_M      from './loader/profile/BTNM.gif';
// import BTN_LDR_GIF_D      from './loader/profile/BTND.gif';
// import BTN_LDR_GIF_E      from './loader/profile/BTNE.gif';
//
// // ProfileStatusLoaderGIF
// import status_LDR_GIF_N   from './loader/profile/statusN.gif'
// import status_LDR_GIF_M   from './loader/profile/statusM.gif'
// import status_LDR_GIF_D   from './loader/profile/statusD.gif'
// import status_LDR_GIF_E   from './loader/profile/statusE.gif'
//
// // UsersGeneralLoaderGIF
// import userLoaderGIF_N    from './loader/users/LDR_N.gif'
// import userLoaderGIF_M    from './loader/users/LDR_M.gif'
// import userLoaderGIF_D    from './loader/users/LDR_D.gif'
// import userLoaderGIF_E    from './loader/users/LDR_E.gif'
//
//
// const TIMER   = 'TIMER';
// export const timerAC = (timer) => ({type: TIMER, timer});
//
// // let theme = ''; // Ссылка на адрес активной в данный момент картинки-фона
// // let themesPack = {};
// // let userLoaderTheme = '';
// // let timeToChangeTheme = 0; // Время до смены картинки
// // let timer = 0; // Количество времени в минутах прошедшее от начала суток до момента открытия сайта
//
//
// let initialState = {
//     theme:             null,
//     backgroundPic:     '',
//     timeToChangeTheme: null,
//     auth_LDR_GIF:      '',
//     profileThemes: {
//         panoramaPic:      '',
//         panorama_LDR_GIF: '',
//         ava_LDR_GIF:      '',
//         BTN_LDR_GIF:      '',
//         status_LDR_GIF:   '',
//     },
//     usersThemes: {
//         generalLDR_GIF:   '',
//     }
// };
//
// export const backgroundReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case TIMER:
//             // console.log('TIMER');
//             if (action.timer >= 1440 || action.timer < 180) {  //  if (action.timer >= 1440 || action.timer < 180) {
//                 // console.log('NIGHT_THEME')
//                 return {...state, theme: 'NIGHT', backgroundPic: backDropPIC_N, timeToChangeTheme: 180 - action.timer,
//                     auth_LDR_GIF: auth_LDR_GIF_N,
//                     profileThemes: {panoramaPic:panoramaPIC_N,panorama_LDR_GIF:panoramaGIF_N,ava_LDR_GIF:ava_LDR_GIF_N,BTN_LDR_GIF:BTN_LDR_GIF_N,status_LDR_GIF:status_LDR_GIF_N,},
//                     usersThemes: {generalLDR_GIF:userLoaderGIF_N,}
//                 }
//
//             } else if (action.timer >= 180 && action.timer < 660) { // } else if (action.timer >= 180 && action.timer < 660) {
//                 // console.log('MORNING_THEME')
//                 return {...state,theme: 'MORNING', backgroundPic: backDropPIC_M, timeToChangeTheme: 660 - action.timer, // 660
//                     auth_LDR_GIF: auth_LDR_GIF_M,
//                     profileThemes: { panoramaPic:panoramaPIC_M,panorama_LDR_GIF:panoramaGIF_M,ava_LDR_GIF:ava_LDR_GIF_M,BTN_LDR_GIF:BTN_LDR_GIF_M,status_LDR_GIF:status_LDR_GIF_M,},
//                     usersThemes:   { generalLDR_GIF:userLoaderGIF_M,}
//                 }
//             } else if (action.timer >= 660 && action.timer < 1080) { // } else if (action.timer >= 660 && action.timer < 1080) { //1080
//                 // console.log('DAY_THEME')
//                 return {...state, theme: 'DAY', backgroundPic: backDropPIC_D, timeToChangeTheme: 1080 - action.timer,
//                     auth_LDR_GIF: auth_LDR_GIF_D,
//                     profileThemes: {panoramaPic:panoramaPIC_D,panorama_LDR_GIF:panoramaGIF_D,ava_LDR_GIF:ava_LDR_GIF_D,BTN_LDR_GIF:BTN_LDR_GIF_D,status_LDR_GIF:status_LDR_GIF_D,},
//                     usersThemes:   {generalLDR_GIF:userLoaderGIF_D,}
//                 }
//             } else if (action.timer >= 1080 && action.timer < 1440) { // } else if (action.timer >= 1080 && action.timer < 1440) { //1440
//                 // console.log('EVENING_THEME')
//                 return {...state, theme: 'EVENING', backgroundPic: backDropPIC_E, timeToChangeTheme: 1440 - action.timer,
//                     auth_LDR_GIF: auth_LDR_GIF_E,
//                     profileThemes: {panoramaPic:panoramaPIC_E,panorama_LDR_GIF:panoramaGIF_E, ava_LDR_GIF:ava_LDR_GIF_E, BTN_LDR_GIF:BTN_LDR_GIF_E,status_LDR_GIF:status_LDR_GIF_E,},
//                     usersThemes:   {generalLDR_GIF:    userLoaderGIF_E,}
//                 }
//                 }
//         default: return state;
//     }
// };
//
// const actionCreators = { timerAC };
// export const backGroundSetterACs = (state=actionCreators) => state;



// backGround picture
import backDropPIC_N    from "./img/backGroundThemes/night.jpg";
import backDropPIC_M    from "./img/backGroundThemes/morning.png";
import backDropPIC_D    from "./img/backGroundThemes/day.jpg";
import backDropPIC_E    from "./img/backGroundThemes/evening.jpg";

// generalAuthorizationLoader
import auth_LDR_GIF_N   from './loader/ifAuthorization/nightLoader.gif';
import auth_LDR_GIF_M   from './loader/ifAuthorization/morningLoader.gif';
import auth_LDR_GIF_D   from './loader/ifAuthorization/dayLoader.gif';
import auth_LDR_GIF_E   from './loader/ifAuthorization/eveningLoader.gif';

// ProfilePanoramaPic
import panoramaPIC_N    from "./img/profilePic/summerNight.jpg";
import panoramaPIC_M    from "./img/profilePic/summerMorning.jpg";
import panoramaPIC_D    from "./img/profilePic/summerDay.jpg";
import panoramaPIC_E    from "./img/profilePic/summerEvening.jpg";

// ProfilePanoramaGIF
import panoramaGIF_N    from './loader/profile/panoramaN.gif';
import panoramaGIF_M    from './loader/profile/panoramaM.gif';
import panoramaGIF_D    from './loader/profile/panoramaD.gif';
import panoramaGIF_E    from './loader/profile/panoramaE.gif';

// ProfileAvaLoaderGIF
import ava_LDR_GIF_N    from './loader/profile/avaN.gif';
import ava_LDR_GIF_M    from './loader/profile/avaM.gif';
import ava_LDR_GIF_D    from './loader/profile/avaD.gif';
import ava_LDR_GIF_E    from './loader/profile/avaE.gif';

// ProfileBTNLoaderGIF
import BTN_LDR_GIF_N    from './loader/profile/BTNN.gif';
import BTN_LDR_GIF_M    from './loader/profile/BTNM.gif';
import BTN_LDR_GIF_D    from './loader/profile/BTND.gif';
import BTN_LDR_GIF_E    from './loader/profile/BTNE.gif';

// ProfileStatusLoaderGIF
import status_LDR_GIF_N from './loader/profile/statusN.gif';
import status_LDR_GIF_M from './loader/profile/statusM.gif';
import status_LDR_GIF_D from './loader/profile/statusD.gif';
import status_LDR_GIF_E from './loader/profile/statusE.gif';

// UsersGeneralLoaderGIF
import userLoaderGIF_N  from './loader/users/LDR_N.gif';
import userLoaderGIF_M  from './loader/users/LDR_M.gif';
import userLoaderGIF_D  from './loader/users/LDR_D.gif';
import userLoaderGIF_E  from './loader/users/LDR_E.gif';


const TIMER   = 'TIMER';
type TimerAC_Type = {type: typeof TIMER, timer:number}
export const timerAC = (timer:number):TimerAC_Type => ({type: TIMER, timer});

type ActionTypes = TimerAC_Type;


export type BG_ACs_Type = {timerAC: (timer:number)=>void}
const actionCreators:BG_ACs_Type = { timerAC };

export const backGroundSetterACs = (state=actionCreators) => state;

// let theme = ''; // Ссылка на адрес активной в данный момент картинки-фона
// let themesPack = {};
// let userLoaderTheme = '';
// let timeToChangeTheme = 0; // Время до смены картинки
// let timer = 0; // Количество времени в минутах прошедшее от начала суток до момента открытия сайта


let initialState = {
    theme:             null  as null | string,
    backgroundPic:     ''    as string,
    timeToChangeTheme: null  as null | number,
    auth_LDR_GIF:      ''    as string,
    profileThemes: {
        panoramaPic:      ''   as string,
        panorama_LDR_GIF: ''   as string,
        ava_LDR_GIF:      ''   as string,
        BTN_LDR_GIF:      ''   as string,
        status_LDR_GIF:   ''   as string,
    },
    usersThemes: {
        generalLDR_GIF:   ''   as string,
    }
};

export type BG_State_Type = typeof initialState;

export const backgroundReducer = (state = initialState, action: ActionTypes) :BG_State_Type => {
    switch (action.type) {
        case TIMER:
            // console.log('TIMER');
            if (action.timer >= 1440 || action.timer < 180) {  //  if (action.timer >= 1440 || action.timer < 180) {
                // console.log('NIGHT_THEME')
                return {...state, theme: 'NIGHT', backgroundPic: backDropPIC_N, timeToChangeTheme: 180 - action.timer,
                    auth_LDR_GIF: auth_LDR_GIF_N,
                    profileThemes: {panoramaPic:panoramaPIC_N,panorama_LDR_GIF:panoramaGIF_N,ava_LDR_GIF:ava_LDR_GIF_N,BTN_LDR_GIF:BTN_LDR_GIF_N,status_LDR_GIF:status_LDR_GIF_N,},
                    usersThemes: {generalLDR_GIF:userLoaderGIF_N,}
                }
            } else if (action.timer >= 180 && action.timer < 660) { // } else if (action.timer >= 180 && action.timer < 660) {
                // console.log('MORNING_THEME')
                return {...state,theme: 'MORNING', backgroundPic: backDropPIC_M, timeToChangeTheme: 660 - action.timer, // 660
                    auth_LDR_GIF: auth_LDR_GIF_M,
                    profileThemes: { panoramaPic:panoramaPIC_M,panorama_LDR_GIF:panoramaGIF_M,ava_LDR_GIF:ava_LDR_GIF_M,BTN_LDR_GIF:BTN_LDR_GIF_M,status_LDR_GIF:status_LDR_GIF_M,},
                    usersThemes:   { generalLDR_GIF:userLoaderGIF_M,}
                }
            } else if (action.timer >= 660 && action.timer < 1080) { // } else if (action.timer >= 660 && action.timer < 1080) { //1080
                // console.log('DAY_THEME')
                return {...state, theme: 'DAY', backgroundPic: backDropPIC_D, timeToChangeTheme: 1080 - action.timer,
                    auth_LDR_GIF: auth_LDR_GIF_D,
                    profileThemes: {panoramaPic:panoramaPIC_D,panorama_LDR_GIF:panoramaGIF_D,ava_LDR_GIF:ava_LDR_GIF_D,BTN_LDR_GIF:BTN_LDR_GIF_D,status_LDR_GIF:status_LDR_GIF_D,},
                    usersThemes:   {generalLDR_GIF:userLoaderGIF_D,}
                }
            } else if (action.timer >= 1080 && action.timer < 1440) { // } else if (action.timer >= 1080 && action.timer < 1440) { //1440
                // console.log('EVENING_THEME')
                return {...state, theme: 'EVENING', backgroundPic: backDropPIC_E, timeToChangeTheme: 1440 - action.timer,
                    auth_LDR_GIF: auth_LDR_GIF_E,
                    profileThemes: {panoramaPic:panoramaPIC_E,panorama_LDR_GIF:panoramaGIF_E, ava_LDR_GIF:ava_LDR_GIF_E, BTN_LDR_GIF:BTN_LDR_GIF_E,status_LDR_GIF:status_LDR_GIF_E,},
                    usersThemes:   {generalLDR_GIF:    userLoaderGIF_E,}
                }
            }
        default: return state;
    }
};





