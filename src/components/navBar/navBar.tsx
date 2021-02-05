// import   React,{ useEffect, useState }                                from "react";
// import   stl                                                          from './navBar.module.css';
// import { NavLink}                                                     from 'react-router-dom';
// import { connect}                                                     from 'react-redux';
// import { withAuthRedirect}                                            from "../content/HOC/withAuthRedirect";

// import { getDialogACs,getMyId,getSmartPartialDialogReducer,getSmartDialogsReducer,getTheme } from "../../redux/selectors";

// function NavBarContainer(props) {
//     // console.log(props)
//     // console.log('container')

//     let [themes, setThemes] = useState({dynamicActiveClass:'',dynamicClass:'stl.linkNight  ',blockMenu:'',counter:'',});
//     useEffect(()=> {
//         switch (props.state.colorTheme) {
//             case 'NIGHT'  : return setThemes({...themes,dynamicActiveClass:stl.activeLinkN,dynamicClass:stl.linkN,blockMenu:stl.blockMenuN,counter:stl.counterN, });
//             case 'MORNING': return setThemes({...themes,dynamicActiveClass:stl.activeLinkM,dynamicClass:stl.linkM,blockMenu:stl.blockMenuM,counter:stl.counterM, });
//             case 'DAY'    : return setThemes({...themes,dynamicActiveClass:stl.activeLinkD,dynamicClass:stl.linkD,blockMenu:stl.blockMenuD,counter:stl.counterD, });
//             case 'EVENING': return setThemes({...themes,dynamicActiveClass:stl.activeLinkE,dynamicClass:stl.linkE,blockMenu:stl.blockMenuE,counter:stl.counterE, });
//         }
//     },[props.state.colorTheme]);

//     let {newMessageBTNDisabled:btnIsDisabled,newMessagesCounter:newMSGSCounter,msgLoader,errGettingNewMSGSCount,onError:onErrorPic}=props.state.partDialogReducer;

//     useEffect(()=>{props.state.myId && props.getNewMessagesRequestThunk()},[]);

//     return themes.dynamicActiveClass && <NavBar
//         myId                    = { props.state.myId                 }
//         getNewMessages          = { props.getNewMessagesRequestThunk }
//         themes                  = { themes                           }

//         btnIsDisabled           = { btnIsDisabled                    }
//         newMSGSCounter          = { newMSGSCounter                   }
//         msgLoader               = { msgLoader                        }
//         errGettingNewMSGSCount  = { errGettingNewMSGSCount           }
//         onErrorPic              = { onErrorPic                       }
//     />
// }
// function NavBar(props) {
//     // console.log(props)
//     // console.log('render')

//     // let [isHiddenBTN, setIsHiddenBTN] = useState(stl.hidden);
//     let isHiddenBTN = stl.hidden;
//     let [element, setElement]         = useState('');

//     useEffect( ()=> {BTNRenderSelector() }, [props.btnIsDisabled, props.errGettingNewMSGSCount] );

//     const BTNRenderSelector=()=>{
//         if (props.btnIsDisabled){
//             // setIsHiddenBTN(stl.hidden);
//             isHiddenBTN = stl.hidden;
//             setElement(<img src={props.msgLoader} alt="err"/>); // лодер конверта
//             return element }
//         else if (props.errGettingNewMSGSCount){
//             // setIsHiddenBTN(stl.showed)
//             stl.hidden = stl.showed;
//             setElement(<img className={stl.errorImg} src={props.onErrorPic} alt='err'/>); // пиктограмма ошибки
//             return  element }
//         else {
//             setElement(<span className={props.themes.dynamicClass}> +1? </span>)
//             return element}
//     };

//     return <>
//         <div className={`${stl.blockMenu}  ${props.themes.blockMenu}`}>
//             <ul className={stl.menu}>
//                 {!props.myId && <li><NavLink to={`/login`} className={props.themes.dynamicClass} activeClassName={props.themes.dynamicActiveClass}
//                 >Get Login</NavLink></li>}
//                 { props.myId && <li><NavLink to={`/profile/${props.myId}`} className={props.themes.dynamicClass} activeClassName={props.themes.dynamicActiveClass}
//                 > Profile </NavLink></li>}
//                 { props.myId && <li><NavLink to={'/friends'} className={props.themes.dynamicClass} activeClassName={props.themes.dynamicActiveClass}
//                 > Friends </NavLink></li>}

//                 { props.myId && <li className={stl.dialogsSpan}>
//                     <button disabled={props.btnIsDisabled} onClick={props.getNewMessages} className={isHiddenBTN}>
//                         {element}
//                        {/* { props.btnIsDisabled && !props.errGettingNewMSGSCount ?  <img src={props.msgLoader} alt="err"/>  :
//                             <span className={themes.dynamicClass}> '+1?'</span>}*/}
//                     </button>
//                     <NavLink to={'/dialogs'}
//                              className={props.themes.dynamicClass}
//                              activeClassName={props.themes.dynamicActiveClass}>
//                         Dialogs </NavLink>
//                     <p className={`${props.themes.counter}`} hidden={!props.newMSGSCounter}>({props.newMSGSCounter})</p>
//                 </li>}
//                 { props.myId && <li><NavLink to={'/users'}
//                                              className={props.themes.dynamicClass}
//                                              activeClassName={props.themes.dynamicActiveClass}> Users </NavLink></li>}
//                 <li><NavLink to='/news'
//                              className={props.themes.dynamicClass}
//                              activeClassName={props.themes.dynamicActiveClass}> News </NavLink></li>
//                 <li><NavLink to='/music'
//                              className={props.themes.dynamicClass}
//                              activeClassName={props.themes.dynamicActiveClass}> Music </NavLink></li>
//                 <li><NavLink to='/settings'
//                              className={props.themes.dynamicClass}
//                              activeClassName={props.themes.dynamicActiveClass}> Settings </NavLink></li>
//             </ul>
//         </div>
//     </>
// }

// const mapStateToProps = (state) => {
//     // console.log(state);
//     return {
//         myId:                   getMyId                      (state),
//         colorTheme:             getTheme                     (state),
//         dialogACs:              getDialogACs                 (state),
//         partDialogReducer:      getSmartPartialDialogReducer (state),
//         // partDialogReducer:     getSmartDialogsReducer(state),
//     }
// };

// const mergeProps = (stateProps, dispatchProps) => {
//     const  state  = stateProps;
//     const { dispatch } = dispatchProps;
//     // console.log(state)

//     const getNewMessagesRequestThunk =()=> dispatch(state.dialogACs.getNewMessagesRequestThunkAC() );

//     return { state, getNewMessagesRequestThunk  }
// };

// const navBarConnector = connect(mapStateToProps, null, mergeProps)(NavBarContainer)
// export default navBarConnector;

// let [isHidden, setIsHidden] = useState(stl.hidden);
// let [element, setElement]   = useState('');

// useEffect( ()=> {
//     BTNRenderSelector()
//     // console.log(12)
// }, [props.btnIsDisabled, props.errGettingNewMSGSCount]);

// const BTNRenderSelector=()=>{
//     if (props.btnIsDisabled){
//         setIsHidden(stl.hidden);
//         setElement(<img src={props.msgLoader} alt="err"/>); // лодер конверта
//         return element }
//     else if (props.errGettingNewMSGSCount){
//         setIsHidden(stl.showed)
//         setElement(<img className={stl.errorImg} src={props.onErrorPic} alt='err'/>); // пиктограмма ошибки
//         return  element }
//     else {
//         setElement(<span className={themes.dynamicClass}> +1? </span>)
//         return element}
// };




import   React,{ DOMElement, useEffect, useState }                    from "react";
import   stl                                                          from './navBar.module.css';
import { NavLink}                                                     from 'react-router-dom';
import { connect}                                                     from 'react-redux';
import { withAuthRedirect}                                            from "../content/HOC/withAuthRedirect";

import { getDialogACs, getMyId,getSmartPartialDialogReducer,getSmartDialogsReducer,getTheme } from "../../redux/selectors";
import { AppStateType } from "../../redux/redux-store";

type ContainerPropsTypes = { 
    getNewMessagesRequestThunk: ()=> void, 
    state: {
        colorTheme: string,
        myId: number,
        partDialogReducer: {
            errGettingNewMSGSCount: boolean,
            msgLoader: string,
            newMessageBTNDisabled: boolean,
            newMessagesCounter: number,
            onError: string
        }
    }
 }

function NavBarContainer(props:ContainerPropsTypes) {
    // console.log(props)

    let [themes, setThemes] = useState({dynamicActiveClass:'',dynamicClass:'stl.linkNight  ',blockMenu:'',counter:'',});
    useEffect(()=> {
        switch (props.state.colorTheme) {
            case 'NIGHT'  : return setThemes({...themes,dynamicActiveClass:stl.activeLinkN,dynamicClass:stl.linkN,blockMenu:stl.blockMenuN,counter:stl.counterN, });
            case 'MORNING': return setThemes({...themes,dynamicActiveClass:stl.activeLinkM,dynamicClass:stl.linkM,blockMenu:stl.blockMenuM,counter:stl.counterM, });
            case 'DAY'    : return setThemes({...themes,dynamicActiveClass:stl.activeLinkD,dynamicClass:stl.linkD,blockMenu:stl.blockMenuD,counter:stl.counterD, });
            case 'EVENING': return setThemes({...themes,dynamicActiveClass:stl.activeLinkE,dynamicClass:stl.linkE,blockMenu:stl.blockMenuE,counter:stl.counterE, });
        }
    },[props.state.colorTheme]);

    let {newMessageBTNDisabled:btnIsDisabled,newMessagesCounter:newMSGSCounter,msgLoader,errGettingNewMSGSCount,onError:onErrorPic}=props.state.partDialogReducer;

    useEffect(()=>{props.state.myId && props.getNewMessagesRequestThunk()},[]);

    return themes.dynamicActiveClass && <NavBar
        myId                    = { props.state.myId                 }
        getNewMessages          = { props.getNewMessagesRequestThunk }
        themes                  = { themes                           }

        btnIsDisabled           = { btnIsDisabled                    }
        newMSGSCounter          = { newMSGSCounter                   }
        msgLoader               = { msgLoader                        }
        errGettingNewMSGSCount  = { errGettingNewMSGSCount           }
        onErrorPic              = { onErrorPic                       }
    />
}

type PropsTypes = {
    btnIsDisabled: boolean,
    errGettingNewMSGSCount: boolean,
    getNewMessages: ()=> void,
    msgLoader: string,
    myId: number,
    newMSGSCounter: number,
    onErrorPic: string, 
    themes: {
        blockMenu: string,
        counter: string,
        dynamicActiveClass: string,
        dynamicClass: string,
    }
}

// function NavBar(props:PropsTypes) {
    let NavBar: React.FC<PropsTypes> = (props)=> {
    // console.log(props)

    // let [isHiddenBTN, setIsHiddenBTN] = useState(stl.hidden);
    let isHiddenBTN = stl.hidden;
    let [element, setElement]     = useState < any > (null);

    useEffect( ()=> {BTNRenderSelector() }, [props.btnIsDisabled, props.errGettingNewMSGSCount] );

    const BTNRenderSelector=()=>{
        if (props.btnIsDisabled){
            // setIsHiddenBTN(stl.hidden);
            isHiddenBTN = stl.hidden;
            setElement(<img src={props.msgLoader} alt="err"/>); // лодер конверта
            return element }
        else if (props.errGettingNewMSGSCount){
            // setIsHiddenBTN(stl.showed)
            isHiddenBTN = stl.showed;
            setElement(<img className={stl.errorImg} src={props.onErrorPic} alt='err'/>); // пиктограмма ошибки
            return  element }
        else {
            setElement(<span className={props.themes.dynamicClass}> +1? </span>)
            return element}
    };

    return <>
        <div className={`${stl.blockMenu}  ${props.themes.blockMenu}`}>
            <ul className={stl.menu}>
                {!props.myId && <li><NavLink to={`/login`} className={props.themes.dynamicClass} activeClassName={props.themes.dynamicActiveClass}
                >Get Login</NavLink></li>}
                { props.myId && <li><NavLink to={`/profile/${props.myId}`} className={props.themes.dynamicClass} activeClassName={props.themes.dynamicActiveClass}
                > Profile </NavLink></li>}
                { props.myId && <li><NavLink to={'/friends'} className={props.themes.dynamicClass} activeClassName={props.themes.dynamicActiveClass}
                > Friends </NavLink></li>}

                { props.myId && <li className={stl.dialogsSpan}>
                    <button disabled={props.btnIsDisabled} onClick={props.getNewMessages} className={isHiddenBTN}>
                        {element}
                       {/* { props.btnIsDisabled && !props.errGettingNewMSGSCount ?  <img src={props.msgLoader} alt="err"/>  :
                            <span className={themes.dynamicClass}> '+1?'</span>}*/}
                    </button>
                    <NavLink to={'/dialogs'}
                             className={props.themes.dynamicClass}
                             activeClassName={props.themes.dynamicActiveClass}>
                        Dialogs </NavLink>
                    <p className={`${props.themes.counter}`} hidden={!props.newMSGSCounter}>({props.newMSGSCounter})</p>
                </li>}
                { props.myId && <li><NavLink to={'/users'}
                                             className={props.themes.dynamicClass}
                                             activeClassName={props.themes.dynamicActiveClass}> Users </NavLink></li>}
                <li><NavLink to='/news'
                             className={props.themes.dynamicClass}
                             activeClassName={props.themes.dynamicActiveClass}> News </NavLink></li>
                <li><NavLink to='/music'
                             className={props.themes.dynamicClass}
                             activeClassName={props.themes.dynamicActiveClass}> Music </NavLink></li>
                <li><NavLink to='/settings'
                             className={props.themes.dynamicClass}
                             activeClassName={props.themes.dynamicActiveClass}> Settings </NavLink></li>
            </ul>
        </div>
    </>
}

const mapStateToProps = (state: AppStateType) => {
    // console.log(state);
    return {
        myId:                   getMyId                      (state),
        colorTheme:             getTheme                     (state),
        dialogACs:              getDialogACs                 (state),
        partDialogReducer:      getSmartPartialDialogReducer (state),
        // partDialogReducer:     getSmartDialogsReducer(state), 
    }
};
 
const mergeProps = (stateProps:any, dispatchProps:any) => {                                                   // ANY !!!!!!!!!!!!!!!!!!!
    const  state  = stateProps;
    // console.log(stateProps);
    
    const { dispatch } = dispatchProps;
    // console.log(state)

    const getNewMessagesRequestThunk =()=> dispatch(state.dialogACs.getNewMessagesRequestThunkAC() );

    return { state, getNewMessagesRequestThunk }
};

// @ts-ignore
const navBarConnector = connect(mapStateToProps, null, mergeProps)(NavBarContainer) as React.ComponentType         // упорно ts выплёвывает ошибку непонятного генеза
export default navBarConnector;
