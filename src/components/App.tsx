import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import stl from './App.module.css';
import { HeaderContainer } from './header/header';
import NavBarConnector from './navBar/navBar';
import { ContentCompContainer } from './content/contentComp';
import StoreContext from './storeContext';
import {
  getAppACs, getBackGroundSetterACs, geSmartInitialized, getSmartBackGroundReducer
} from "../redux/selectors";


export let AppTimeDeterminationContainer = () => {

  let backgroundReducer = useSelector(getSmartBackGroundReducer);
  let backGroundSetterACs = useSelector(getBackGroundSetterACs);

  let dispatch = useDispatch();

  let timeSetter = (timer: number) => { dispatch(backGroundSetterACs.timerGetter(timer)) }

  let timer = new Date().getHours() * 60 + new Date().getMinutes();
  useEffect(() => {
    timeSetter(timer);
    setTimeout(() => { dispatch(backGroundSetterACs.transitionFlagSetter()) }, 2000)  // перенести в функциональный компонент!!!!!!
  }, []);                                // ф-я отправляет количество минут с начала суток в редюсер
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundReducer.backgroundPic})`
  }, [backgroundReducer.backgroundPic]);


  return backgroundReducer.timeToChangeTheme && backgroundReducer.backgroundPic !== '' && <AppContainer />
};


let AppContainer = () => {

  let { auth_LDR_GIF, timeToChangeTheme } = useSelector(getSmartBackGroundReducer) // timeToChangeTheme - время до смены темы в минутах
  let { funnyLoaderArr, appIsInitialized } = useSelector(geSmartInitialized)
  let backGroundSetterACs = useSelector(getBackGroundSetterACs);
  let appAC = useSelector(getAppACs)

  let dispatch = useDispatch();


  let timeToChangeThemeInMS = timeToChangeTheme * 60000;                                        // преобразование минут в милисекунды для передачи в сетИнтервал
  let timer: number                                                                             // количество минут с начала суток
  let tick = () => { timer = new Date().getHours() * 60 + new Date().getMinutes() }              // timer = количество минут, прошедших с начала суток

  let themeUpdater = (timer: number) => { dispatch(backGroundSetterACs.timerGetter(timer)) };   // ф-я отправляет количество минут с начала суток в редюсер
  useEffect(() => { dispatch(appAC.initializeAppThunkAC(timer)); }, []);
  useEffect(() => { setInterval(tick, 1000) }, [])
  useEffect(() => { setInterval(() => { themeUpdater(timer) }, timeToChangeThemeInMS) }, [])

  let forAppProps = { funnyLoaderArr, appInitialized: appIsInitialized, auth_LDR_GIF }

  return <App props={forAppProps} />
}


type AppProps_Type = { props: { appInitialized: boolean, auth_LDR_GIF: string, funnyLoaderArr: string[] } }
let App: React.FC<AppProps_Type> = ({ props: { appInitialized, auth_LDR_GIF, funnyLoaderArr } }) => {


  let [loadPhrase, setLoadPhrase] = useState<string>(funnyLoaderArr[0])

  function* funnyLoader(loadersArr: string[]) { for (let i = 0; i <= loadersArr.length; i++) { yield loadersArr[i] } }


  let [refreshContent, setRefreshContent] = useState<any>();
  let iterator = (condition: boolean) => {
    if (!condition) { let num = funnyLoader(funnyLoaderArr); setRefreshContent(setInterval(() => { setLoadPhrase(num.next().value as string) }, 700)) }
    else { setTimeout(() => { clearInterval(refreshContent) }, 1500) }
  }

  useEffect(() => { iterator(appInitialized) }, [appInitialized])


  return <>
    <StoreContext.Consumer>
      {() => {
        return !appInitialized ?
          <div className={stl.loaderBlock}>
            <img src={auth_LDR_GIF} alt="err" />
            <h1>{loadPhrase ? loadPhrase : funnyLoaderArr[funnyLoaderArr.length - 1]}</h1>
          </div>
          :
          <div className={stl.container}>
            <div className={stl.header}> <HeaderContainer /> </div>
            <div className={stl.navBar}> <NavBarConnector /> </div>
            <div className={stl.content1}> <ContentCompContainer /> </div>
          </div>
      }}
    </StoreContext.Consumer>
  </>
}

