import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import stl from './App.module.css';
import { HeaderContainer } from './header/header';
import NavBarConnector from './navBar/navBar';
import { ContentCompContainer } from './content/contentComp';
import StoreContext from './storeContext';
import {
  getAppACs, getBackGroundSetterACs,
  getInitialized, getSmartBackGroundReducer, GetSmartBGR_type
} from "../redux/selectors";


export let AppTimeDeterminationContainer = () => {

  let backgroundReducer = useSelector(getSmartBackGroundReducer);
  let backGroundSetterACs = useSelector(getBackGroundSetterACs);

  let dispatch = useDispatch();

  let timeSetter = (timer: number) => { dispatch(backGroundSetterACs.timerAC(timer)) }

  let timer = new Date().getHours() * 60 + new Date().getMinutes();
  useEffect(() => { timeSetter(timer) }, []);                                // ф-я отправляет количество минут с начала суток в редюсер
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundReducer.backgroundPic})`
  }, [backgroundReducer.backgroundPic]);

  return backgroundReducer.timeToChangeTheme && backgroundReducer.backgroundPic !== '' && <AppContainer />
};


let AppContainer = () => {

  let backgroundReducer = useSelector(getSmartBackGroundReducer)
  let appInitialized = useSelector(getInitialized)
  let backGroundSetterACs = useSelector(getBackGroundSetterACs);
  let appAC = useSelector(getAppACs)

  let dispatch = useDispatch();

  let timeKeeper = backgroundReducer.timeToChangeTheme * 60000;                           // преобразование минут в милисекунды
  let timer = new Date().getHours() * 60 + new Date().getMinutes();

  let themeUpdater = () => { dispatch(backGroundSetterACs.timerAC(timer)) };              // ф-я отправляет количество минут с начала суток в редюсер
  useEffect(() => { dispatch(appAC.initializeAppThunkAC(timer)); }, []);
  setInterval(() => { themeUpdater() }, timeKeeper);

  return <App appInitialized={appInitialized} auth_LDR_GIF={backgroundReducer.auth_LDR_GIF} />
}

type AppProps_Type = { appInitialized: boolean, auth_LDR_GIF: string }
let App: React.FC<AppProps_Type> = ({ appInitialized, auth_LDR_GIF }) => {
  return <>
    <StoreContext.Consumer>
      {() => {
        return !appInitialized ?
          <div className={stl.loaderBlock}>
            <img src={auth_LDR_GIF} alt="err" />
            <h1>Client: Synchronization...</h1>
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

