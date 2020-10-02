import imgNight          from "./img/backGroundThemes/night.jpg";
import imgMorning        from "./img/backGroundThemes/morning.png";
import imgDay            from "./img/backGroundThemes/day.jpg";
import imgEvening        from "./img/backGroundThemes/evening.jpg";

import nightPanorama     from "./img/propfilePic/summerNight.jpg";
import morningPanorama   from "./img/propfilePic/summerMorning.jpg";
import dayPanorama       from "./img/propfilePic/summer.jpg";
import eveningPanorama   from "./img/propfilePic/summerEvening.jpg";

import userNightLoader   from './loader/profile/nightLoader.gif';
import userMorningLoader from './loader/profile/morningLoader.gif';
import userDayLoader     from './loader/profile/dayLoader.gif';
import userEveningLoader from './loader/profile/eveningLoader.gif';

const TIMER   = 'TIMER';
export const timerAC = (timer) => ({type: TIMER, timer});

// let theme = ''; // Ссылка на адрес активной в данный момент картинки-фона
// let themesPack = {};
// let userLoaderTheme = '';
// let timeToChangeTheme = 0; // Время до смены картинки
// let timer = 0; // Количество времени в минутах прошедшее от начала суток до момента открытия сайта


let initialState = {
    theme:              '',
    backgroundPic:      '',
    userNightLoader:    '',
    timeToChangeTheme:  0,
    timer:              0,
    userLoaderTheme:    '',
    profilePanoramaPic: '',
};

export const backgroundReducer = (state = initialState, action) => {
    switch (action.type) {
        case TIMER:
            // console.log('TIMER');
            if (action.timer >= 1440 || action.timer < 180) {
                // console.log('NIGHT_THEME')
                return {...state, theme: 'NIGHT', backgroundPic: imgNight, timeToChangeTheme: 180 - action.timer,
                    userLoaderTheme: userNightLoader, profilePanoramaPic: nightPanorama,
                }
            } else if (action.timer >= 180 && action.timer < 660) {
                // console.log('MORNING_THEME')
                return {...state,theme: 'MORNING', backgroundPic: imgMorning, timeToChangeTheme: 660 - action.timer,
                    userLoaderTheme: userMorningLoader, profilePanoramaPic: morningPanorama,
                }
            } else if (action.timer >= 660 && action.timer < 1080) {//1080
                // console.log('DAY_THEME')
                return {...state, theme: 'DAY', backgroundPic: imgDay, timeToChangeTheme: 1080 - action.timer,
                    userLoaderTheme: userDayLoader, profilePanoramaPic: dayPanorama,
                }
            } else if (action.timer >= 1080 && action.timer < 1440) {//1440
                // console.log('EVENING_THEME')
                return {...state, theme: 'EVENING', backgroundPic: imgEvening, timeToChangeTheme: 1440 - action.timer,
                    userLoaderTheme: userEveningLoader,  profilePanoramaPic: eveningPanorama,
                }
                // return {...state, theme: 'DAY', backgroundPic: imgDay, timeToChangeTheme: 1080 - action.timer,
                //     userLoaderTheme: userDayLoader, profilePanoramaPic: dayPanorama,
                // }
            }
        default: return state;
    }
};

const actionCreators = { timerAC };
export const backGroundSetterACs = (state=actionCreators) => state;

export {userMorningLoader}; // ВРЕМЕННО ДЛЯ PROFILEREDUCER

