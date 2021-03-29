// backGround picture =============================================================================================================  backGround picture
import backDropPIC_N from "./img/backGroundThemes/night.jpg";
import backDropPIC_M from "./img/backGroundThemes/morning.png";
import backDropPIC_D from "./img/backGroundThemes/day.jpg";
import backDropPIC_E from "./img/backGroundThemes/evening.jpg";

// generalAuthorizationLoader ===================================================================================================== generalAuthorizationLoader
import auth_LDR_GIF_N from './loader/ifAuthorization/nightLoader.gif';
import auth_LDR_GIF_M from './loader/ifAuthorization/morningLoader.gif';
import auth_LDR_GIF_D from './loader/ifAuthorization/dayLoader.gif';
import auth_LDR_GIF_E from './loader/ifAuthorization/eveningLoader.gif';

// ProfilePanoramaPic =============================================================================================================  Profile
import panoramaPIC_N from "./img/profilePic/summerNight.jpg";
import panoramaPIC_M from "./img/profilePic/summerMorning.jpg";
import panoramaPIC_D from "./img/profilePic/summerDay.jpg";
import panoramaPIC_E from "./img/profilePic/summerEvening.jpg";

// ProfilePanoramaGIF
import panoramaGIF_N from './loader/profile/panoramaN.gif';
import panoramaGIF_M from './loader/profile/panoramaM.gif';
import panoramaGIF_D from './loader/profile/panoramaD.gif';
import panoramaGIF_E from './loader/profile/panoramaE.gif';

// ProfileAvaLoaderGIF
import ava_LDR_GIF_N from './loader/profile/avaN.gif';
import ava_LDR_GIF_M from './loader/profile/avaM.gif';
import ava_LDR_GIF_D from './loader/profile/avaD.gif';
import ava_LDR_GIF_E from './loader/profile/avaE.gif';

// ProfileBTNLoaderGIF
import BTN_LDR_GIF_N from './loader/profile/BTNN.gif';
import BTN_LDR_GIF_M from './loader/profile/BTNM.gif';
import BTN_LDR_GIF_D from './loader/profile/BTND.gif';
import BTN_LDR_GIF_E from './loader/profile/BTNE.gif';

// ProfileStatusLoaderGIF
import status_LDR_GIF_N from './loader/profile/statusN.gif';
import status_LDR_GIF_M from './loader/profile/statusM.gif';
import status_LDR_GIF_D from './loader/profile/statusD.gif';
import status_LDR_GIF_E from './loader/profile/statusE.gif';

// DialoguesLoadersGIF ============================================================================================================= Dialogues

import halfCircle_GIF_N from './loader/dialogs/allDialogsList/halfCircle_N.gif';
import halfCircle_GIF_M from './loader/dialogs/allDialogsList/halfCircle_M.gif';
import halfCircle_GIF_D from './loader/dialogs/allDialogsList/halfCircle_D.gif';
import halfCircle_GIF_E from './loader/dialogs/allDialogsList/halfCircle_E.gif';

import interSector_GIF_N from './loader/dialogs/allDialogsList/interSector_N.gif';
import interSector_GIF_M from './loader/dialogs/allDialogsList/interSector_M.gif';
import interSector_GIF_D from './loader/dialogs/allDialogsList/interSector_D.gif';
import interSector_GIF_E from './loader/dialogs/allDialogsList/interSector_E.gif';

// UsersGeneralLoaderGIF =========================================================================================================== Users
import userLoaderGIF_N from './loader/users/LDR_N.gif';
import userLoaderGIF_M from './loader/users/LDR_M.gif';
import userLoaderGIF_D from './loader/users/LDR_D.gif';
import userLoaderGIF_E from './loader/users/LDR_E.gif';
import { type } from "os";


const TIMER = 'TIMER';
export type TimerAC_Type = { type: typeof TIMER, timer: number }
export const timerAC = (timer: number): TimerAC_Type => ({ type: TIMER, timer });

type ActionTypes = TimerAC_Type;


export type BG_ACs_Type = { timerAC: (timer: number) => void }
const actionCreators: BG_ACs_Type = { timerAC };

export const backGroundSetterACs = (state = actionCreators) => state;

// let theme = ''; // Ссылка на адрес активной в данный момент картинки-фона
// let themesPack = {};
// let userLoaderTheme = '';
// let timeToChangeTheme = 0; // Время до смены картинки
// let timer = 0; // Количество времени в минутах прошедшее от начала суток до момента открытия сайта

export type ProfileThemes_Type = {
    panoramaPic: string; panorama_LDR_GIF: string; ava_LDR_GIF: string; BTN_LDR_GIF: string; status_LDR_GIF: string, auth_LDR_GIF: string
}

export type DialoguesThemes_Type = { halfCircle_GIF: string, interSector_GIF: string, }

export type UsersThemesBGR_Type = { generalLDR_GIF: string }

let initialState = {
    theme: '' as string,
    backgroundPic: '' as string,
    timeToChangeTheme: 0 as number,
    auth_LDR_GIF: '' as string,
    profileThemes: {
        auth_LDR_GIF: '' as string,
        panoramaPic: '' as string,
        panorama_LDR_GIF: '' as string,
        ava_LDR_GIF: '' as string,
        BTN_LDR_GIF: '' as string,
        status_LDR_GIF: '' as string,
    } as ProfileThemes_Type,
    dialogsThemes: {
        halfCircle_GIF: '' as string,
        interSector_GIF: '' as string,
    } as DialoguesThemes_Type,
    usersThemes: {
        generalLDR_GIF: '' as string,
    } as UsersThemesBGR_Type,
};

export type BG_State_Type = typeof initialState;

export const backgroundReducer = (state = initialState, action: ActionTypes): BG_State_Type => {
    switch (action.type) {
        case TIMER:
            // console.log('TIMER');
            if (action.timer >= 1440 || action.timer < 180) {  //  if (action.timer >= 1440 || action.timer < 180) {
                // console.log('NIGHT_THEME')
                return {
                    ...state, theme: 'NIGHT', backgroundPic: backDropPIC_N, timeToChangeTheme: 180 - action.timer,
                    auth_LDR_GIF: auth_LDR_GIF_N,
                    profileThemes: { auth_LDR_GIF: auth_LDR_GIF_N, panoramaPic: panoramaPIC_N, panorama_LDR_GIF: panoramaGIF_N, ava_LDR_GIF: ava_LDR_GIF_N, BTN_LDR_GIF: BTN_LDR_GIF_N, status_LDR_GIF: status_LDR_GIF_N, },
                    dialogsThemes: { halfCircle_GIF: halfCircle_GIF_N, interSector_GIF: interSector_GIF_N },
                    usersThemes: { generalLDR_GIF: userLoaderGIF_N, }
                }
            } else if (action.timer >= 180 && action.timer < 660) { // } else if (action.timer >= 180 && action.timer < 660) {
                // console.log('MORNING_THEME')
                return {
                    ...state, theme: 'MORNING', backgroundPic: backDropPIC_M, timeToChangeTheme: 660 - action.timer, // 660
                    auth_LDR_GIF: auth_LDR_GIF_M,
                    profileThemes: { auth_LDR_GIF: auth_LDR_GIF_M, panoramaPic: panoramaPIC_M, panorama_LDR_GIF: panoramaGIF_M, ava_LDR_GIF: ava_LDR_GIF_M, BTN_LDR_GIF: BTN_LDR_GIF_M, status_LDR_GIF: status_LDR_GIF_M, },
                    dialogsThemes: { halfCircle_GIF: halfCircle_GIF_M, interSector_GIF: interSector_GIF_M },
                    usersThemes: { generalLDR_GIF: userLoaderGIF_M, }
                }
            } else if (action.timer >= 660 && action.timer < 1080) { // } else if (action.timer >= 660 && action.timer < 1080) { //1080
                // console.log('DAY_THEME')
                return {
                    ...state, theme: 'DAY', backgroundPic: backDropPIC_D, timeToChangeTheme: 1080 - action.timer,
                    auth_LDR_GIF: auth_LDR_GIF_D,
                    profileThemes: { auth_LDR_GIF: auth_LDR_GIF_D, panoramaPic: panoramaPIC_D, panorama_LDR_GIF: panoramaGIF_D, ava_LDR_GIF: ava_LDR_GIF_D, BTN_LDR_GIF: BTN_LDR_GIF_D, status_LDR_GIF: status_LDR_GIF_D, },
                    dialogsThemes: { halfCircle_GIF: halfCircle_GIF_D, interSector_GIF: interSector_GIF_D },
                    usersThemes: { generalLDR_GIF: userLoaderGIF_D, }
                }
            } else if (action.timer >= 1080 && action.timer < 1440) { // } else if (action.timer >= 1080 && action.timer < 1440) { //1440
                // console.log('EVENING_THEME')
                return {
                    ...state, theme: 'EVENING', backgroundPic: backDropPIC_E, timeToChangeTheme: 1440 - action.timer,
                    auth_LDR_GIF: auth_LDR_GIF_E,
                    profileThemes: { auth_LDR_GIF: auth_LDR_GIF_E, panoramaPic: panoramaPIC_E, panorama_LDR_GIF: panoramaGIF_E, ava_LDR_GIF: ava_LDR_GIF_E, BTN_LDR_GIF: BTN_LDR_GIF_E, status_LDR_GIF: status_LDR_GIF_E, },
                    dialogsThemes: { halfCircle_GIF: halfCircle_GIF_E, interSector_GIF: interSector_GIF_E },
                    usersThemes: { generalLDR_GIF: userLoaderGIF_E, }
                }
            }
        default: return state;
    }
};





