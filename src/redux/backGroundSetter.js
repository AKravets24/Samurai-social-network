import imgNight from "./img/backGroundThemes/night.jpg";
import imgMorning from "./img/backGroundThemes/morning.png";
import imgDay from "./img/backGroundThemes/day.jpg";
import imgEvening from "./img/backGroundThemes/evening.jpg";

import userNightLoader from './loader/profile/nightLoader.gif'
import userMorningLoader from './loader/profile/morningLoader.gif'
import userDayLoader from './loader/profile/dayLoader.gif'
import userEveningLoader from './loader/profile/eveningLoader.gif'

let theme = ''; // Ссылка на адрес активной в данный момент картинки-фона
let themesPack = {};
let userLoaderTheme = '';
let timeToChangeTheme = 0; // Время до смены картинки
let timer = 0; //Цифра в минутах с начала открытия сайта от нуля времени

const nightThemesPack = {
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
};
const morningThemesPack = {
    header: {
        header: {backgroundColor: 'orange'},
        logotypeH1: {color: 'green'},
        loginH4: {color: 'green'},
        loginHref: {color: 'green'}
    },
    navBar: {},
    content: {},
};
const dayThemesPack = {
    header: {
        header: {backgroundColor: 'lightskyblue'},
        logotypeH1: {color: 'white'},
        loginH4: {color: 'white'},
        loginHref: {color: 'white'}
    },
    navBar: {},
    content: {},
};
const eveningThemesPack = {
    header: {
        header: {backgroundColor: 'tomato'},
        logotypeH1: {color: 'blue'},
        loginH4: {color: 'blue'},
        loginHref: {color: 'blue'}
    },
    navBar: {},
    content: {},
};

function backgroundThemeSelector() {
    timer = new Date().getHours() * 60 + new Date().getMinutes();
    if (timer >= 1440 || timer < 180) {
        timeToChangeTheme = 180 - timer;
        theme = imgNight;
        userLoaderTheme = userNightLoader;
        themesPack = nightThemesPack;
        return {theme, userLoaderTheme, themesPack};
    } else if (timer >= 180 && timer < 660) {
        timeToChangeTheme = 660 - timer;
        theme = imgMorning;
        userLoaderTheme = userMorningLoader;
        themesPack = morningThemesPack;
        return {theme, userLoaderTheme, themesPack};
    } else if (timer >= 660 && timer < 1080) { /*1080 = 18*/
        timeToChangeTheme = 1080 - timer;
        theme = imgDay;
        userLoaderTheme = userDayLoader;
        themesPack = dayThemesPack;
        return {theme, userLoaderTheme, themesPack};
    } else if (timer >= 1080 && timer < 1440) {
        timeToChangeTheme = 1440 - timer;
        theme = imgEvening;
        userLoaderTheme = userEveningLoader;
        themesPack = eveningThemesPack;
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

