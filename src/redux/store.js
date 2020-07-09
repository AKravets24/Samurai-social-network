import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import imgNight from './img/backGroundThemes/night.jpg';
import imgMorning from './img/backGroundThemes/morning.png'
import imgDay from './img/backGroundThemes/day.jpg';
import imgEvening from './img/backGroundThemes/evening.jpg';

// Мой кастомный блок
// --------------- Блок с динамической сменой фона ------------------
let theme; // Ссылка на адрес активной в данный момент картинки-фона
let timeToChangeTheme; // Время до смены картинки
let timer; //Цифра в минутах с начала открытия сайта от нуля времени
function backgroundThemeSelector() {
    timer = new Date().getHours() * 60 + new Date().getMinutes();
    if (timer >= 1440 || timer < 180) {
        timeToChangeTheme = 180 - timer;
        theme = imgNight;
        return theme;
    } else if (timer >= 180 && timer < 660) {
        timeToChangeTheme = 660 - timer;
        theme = imgMorning;
        return theme;
    } else if (timer >= 660 && timer < 1080 ) { /*1080 = 18*/
        timeToChangeTheme = 1080 - timer;
        theme = imgDay;
        return theme;
    } else if (timer >= 1080 && timer < 1440) {
        timeToChangeTheme = 1440 - timer;
        theme = imgEvening;
        return theme;
    }
}
function setTheme() {
    backgroundThemeSelector();
    console.log(theme)
    document.body.style.backgroundImage = `url(${theme})`;
}
setTheme();
// console.log(timeToChangeTheme * 1000 * 60);
console.log(`сайт открыт через ${timer} минут от начала суток `);

function caller (){
    console.log(timeToChangeTheme)
}

setInterval(caller, 5000)


//--------------------------------------------------------------------

// блок Димыча
export const store1 = {

    _state: {

        // timeToChangeTheme: timeToChangeTheme,
        //
        // funcSetTheme: setTheme,

        profilePage: {
            wallPosts: [
                {"id": 5, "likesCount": 88, "date": "28.04.20", "time": "16:00", "message": "Many kisses honey=))"},
                {"id": 4, "likesCount": 58, "date": "28.04.20", "time": "15:30", "message": "I miss you soo much"},
                {"id": 3, "likesCount": 40, "date": "28.04.20", "time": "15:00", "message": "Lets`s met sweety!"},
                {"id": 2, "likesCount": 25, "date": "28.04.20", "time": "14:30", "message": "how are you?"},
                {"id": 1, "likesCount": 12, "date": "28.04.20", "time": "14:00", "message": "hey"},
            ],
            postField: '',
        },

        dialogsPage: {
            dialogs: [
                {"id": 1, "name": "Anya"},
                {"id": 2, "name": "Igor"},
                {"id": 3, "name": "Vasya"},
                {"id": 4, "name": "Kirill"},
                {"id": 5, "name": "Seryoga"},
                {"id": 6, "name": "Vanya"},
                {"id": 7, "name": "Stas"},


            ],
            messages: [
                [
                    {"id": 1, "date": "28.04.20", "time": "12:01", "message": 'Hello my dear!!'},
                    {"id": 2, "date": "28.04.20", "time": "12:03", "message": 'How are u doing honey?'},
                    {"id": 3, "date": "28.04.20", "time": "12:05", "message": 'I Miss you soo much..'},
                    {"id": 4, "date": "28.04.20", "time": "12:09", "message": 'Let`s see each other?!'},
                    {"id": 5, "date": "28.04.20", "time": "12:10", "message": 'Hope you fine!'},
                    {"id": 6, "date": "28.04.20", "time": "12:12", "message": 'Many kisses to you =))'},
                    {"id": 7, "date": "28.04.20", "time": "12:12", "message": 'Many kisses to you =))'},
                    {"id": 8, "date": "28.04.20", "time": "12:12", "message": 'Many kisses to you =))'},
                    {"id": 9, "date": "28.04.20", "time": "12:12", "message": 'Many kisses to you =))'},
                    {"id": 10, "date": "28.04.20", "time": "12:12", "message": 'Hope you fine!'},
                ],

                [
                    {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'Hi man!'},
                    {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'How r u?'},
                    {"id": 3, "date": "28.04.20", "time": "12:10", "message": 'Making eat now)'},
                ],

                [
                    {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'Hello dude!'},
                    {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'Nice weather'},
                    {"id": 3, "date": "28.04.20", "time": "12:10", "message": 'Let`s go ride some bicycles'},
                    {"id": 4, "date": "28.04.20", "time": "12:10", "message": 'Me at Moose island!'},
                ],

                [
                    {"id": 1, "date": "28.04.20", "time": "12:09", "message": 'Hi Temich!'},
                    {
                        "id": 2,
                        "date": "28.04.20",
                        "time": "12:10",
                        "message": 'Do you heared new song of Northern fleet?'
                    },
                ],

                [
                    {"id": 1, "date": "28.04.20", "time": "12:09", "message": 'heyho!!'},
                    {"id": 2, "date": "28.04.20", "time": "12:10", "message": 'Let`s go at that bunker tomorrow?'},
                    {"id": 3, "date": "28.04.20", "time": "12:10", "message": 'after dinner?'},
                ],

                [
                    {"id": 1, "date": "28.04.20", "time": "12:09", "message": 'Hey'},
                    {"id": 2, "date": "28.04.20", "time": "12:10", "message": 'I quit my work yesterday'},
                ],

                [
                    {"id": 1, "date": "28.04.20", "time": "12:05", "message": 'Hello'},
                    {"id": 2, "date": "28.04.20", "time": "12:09", "message": 'We are riding at those abandon village tomorrow!'},
                    {"id": 3, "date": "28.04.20", "time": "12:10", "message": 'Do you want with us?'},
                    {"id": 4, "date": "28.04.20", "time": "12:10", "message": 'It should be interesting!'},
                ],

            ],

            messageField: '',

        },
    },

    _reRender() {
        console.log('state changed')
    },

    subscribe(observer) {
        this._reRender = observer
    },
    getState() {
        return this._state
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._reRender(this._state);
    },

};


// console.log(store._state.theme);


/*
const changeTimeToNightTheme = 1380; //23
const changeTimeToMorningTheme = 180;//3
const changeTimeToDayTheme = 660;//11
const changeTimeToEveningTheme = 1080;//18*/