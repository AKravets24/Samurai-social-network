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
            }
        default: return state;
    }
};

const actionCreators = { timerAC };
export const backGroundSetterACs = (state=actionCreators) => state;

export {userMorningLoader}; // ВРЕМЕННО ДЛЯ PROFILEREDUCER

// export function setTheme() {
//     let timer = new Date().getHours() * 60 + new Date().getMinutes();
//     // backgroundThemeSelector();
//     // document.body.style.backgroundImage = `url(${theme})`;
//     // console.log(themesPack)
// }
// setTheme();

// console.log(`сайт открыт через ${timer} минут от начала суток `);



// console.log(timeToChangeTheme)




/*
let theme = ''; // Ссылка на адрес активной в данный момент картинки-фона
let themesPack = {};
let userLoaderTheme = '';
let timeToChangeTheme = 0; // Время до смены картинки
let timer = 0; //Цифра в минутах с начала открытия сайта от нуля времени


let initialState = {
    nightThemesPack: {
        header: {
            header: {backgroundColor: 'midnightblue'},
            logotypeH1: {color: 'lightyellow'},
            loginH4: {color: 'lightyellow'},
            loginHref: {color: 'lightyellow'}
        },
        navBar: {
            blockMenu: {backgroundColor: 'lightskyblue'},
            menuA: {color: 'blue'},
            ['menu a:hover']:{color: 'blue'},
            ['menu a:active']:{color: 'tomato'},
            ['menu a.activeLink']:{color: 'tomato'},
        },
        content: {},
    },
    morningThemesPack: {
        header: {
            header: {backgroundColor: 'orange'},
            logotypeH1: {color: 'green'},
            loginH4: {color: 'green'},
            loginHref: {color: 'green'}
        },
        navBar: {},
        content: {},
    },
    dayThemesPack: {
        header: {
            header: {backgroundColor: 'lightskyblue'},
            logotypeH1: {color: 'white'},
            loginH4: {color: 'white'},
            loginHref: {color: 'white'}
        },
        navBar: {},
        content: {},
    },
    eveningThemesPack:  {
        header: {
            header: {backgroundColor: 'tomato'},
            logotypeH1: {color: 'blue'},
            loginH4: {color: 'blue'},
            loginHref: {color: 'blue'}
        },
        navBar: {},
        content: {},
    },
}


function backgroundThemeSelector(state = initialState) {
    let stateCopy = {...state};
    timer = new Date().getHours() * 60 + new Date().getMinutes();
    if (timer >= 1440 || timer < 180) {
        timeToChangeTheme = 180 - timer;
        theme = imgNight;
        userLoaderTheme = userNightLoader;
        themesPack = {...state.nightThemesPack};
        return {theme, userLoaderTheme, themesPack};
    } else if (timer >= 180 && timer < 660) {
        timeToChangeTheme = 660 - timer;
        theme = imgMorning;
        userLoaderTheme = userMorningLoader;
        themesPack = {...state.morningThemesPack};
        return {theme, userLoaderTheme, themesPack};
    } else if (timer >= 660 && timer < 1080) { /!*1080 = 18*!/
        timeToChangeTheme = 1080 - timer;
        theme = imgDay;
        userLoaderTheme = userDayLoader;
        themesPack = {...state.dayThemesPack};
        return {theme, userLoaderTheme, themesPack};
    } else if (timer >= 1080 && timer < 1440) {
        timeToChangeTheme = 1440 - timer;
        theme = imgEvening;
        userLoaderTheme = userEveningLoader;
        themesPack = {...state.eveningThemesPack};
        return {theme, userLoaderTheme, themesPack};
    }
}

function setTheme() {
    backgroundThemeSelector();
    // console.log(themesPack)
    document.body.style.backgroundImage = `url(${theme})`;
}

setTheme();

export {userLoaderTheme};

// console.log(`сайт открыт через ${timer} минут от начала суток `);

export const backGroundChanger = {
    timeToChangeTheme: timeToChangeTheme,
    funcSetTheme: setTheme,
    themes : themesPack,
};


// console.log(timeToChangeTheme)

export const backGroundSetter = (state = backGroundChanger) => {
    return backGroundChanger
};
*/
