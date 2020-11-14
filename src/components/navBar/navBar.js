import React,{useEffect, useState} from "react";
import stl                        from './navBar.module.css';
import {NavLink}                  from 'react-router-dom';
import {connect}                  from 'react-redux';

import {withAuthRedirect}         from "../content/HOC/withAuthRedirect";

function NavBarContainer(props) {
    // console.log(props)
    useEffect(()=>{props.state.myId && props.getNewMessagesRequestThunk(); },[]);

    return <NavBar
        myId                    = { props.state.myId                   }
        colorTheme              = { props.state.colorTheme             }
        getNewMessages          = { props.getNewMessagesRequestThunk   }
        btnIsDisabled           = { props.state.btnNewMessagesState    }
        newMSGSCounter          = { props.state.newMSGSCounter         }
        msgLoader               = { props.state.msgLoader              }
        errGettingNewMSGSCount  = { props.state.errGettingNewMSGSCount }
        onErrorPic              = { props.state.onErrorPic             }
    />
}
function NavBar(props) {
    // console.log(props.errGettingNewMSGSCount)

    let [themes, setThemes] = useState({dynamicActiveClass:'',dynamicClass:'stl.linkNight  ',blockMenu:'',counter:'',});

    useEffect(()=> {
             if(props.colorTheme==='NIGHT'  ){setThemes({...themes,dynamicActiveClass:stl.activeLinkNight  ,dynamicClass:stl.linkNight  ,blockMenu:stl.blockMenuNight,
                 counter:stl.counterN,
             })}
        else if(props.colorTheme==='MORNING'){setThemes({...themes,dynamicActiveClass:stl.activeLinkMorning,dynamicClass:stl.linkMorning,blockMenu:stl.blockMenuMorning,
                 counter:stl.counterM,
        })}
        else if(props.colorTheme==='DAY'    ){setThemes({...themes,dynamicActiveClass:stl.activeLinkDay    ,dynamicClass:stl.linkDay    ,blockMenu:stl.blockMenuDay,
                 counter:stl.counterD,
        })}
        else if(props.colorTheme==='EVENING'){setThemes({...themes,dynamicActiveClass:stl.activeLinkEvening,dynamicClass:stl.linkEvening,blockMenu:stl.blockMenuEvening,
                 counter:stl.counterE,
        })}
    },[props.colorTheme]);

    let [isHiddenBTN, setIsHiddenBTN] = useState(stl.hidden);
    let [element, setElement]   = useState('');

    useEffect( ()=> { BTNRenderSelector() }, [props.btnIsDisabled, props.errGettingNewMSGSCount] );

    const BTNRenderSelector=()=>{
        if (props.btnIsDisabled){
            setIsHiddenBTN(stl.hidden);
            setElement(<img src={props.msgLoader} alt="err"/>); // лодер конверта
            return element }
        else if (props.errGettingNewMSGSCount){
            setIsHiddenBTN(stl.showed)
            setElement(<img className={stl.errorImg} src={props.onErrorPic} alt='err'/>); // пиктограмма ошибки
            return  element }
        else {
            setElement(<span className={themes.dynamicClass}> +1? </span>)
            return element}
    };

    return <>
        <div className={`${stl.blockMenu}  ${themes.blockMenu}`}>
            <ul className={stl.menu}>
                {!props.myId && <li><NavLink to={`/login`} className={themes.dynamicClass} activeClassName={themes.dynamicActiveClass}
                >Get Login</NavLink></li>}
                { props.myId && <li><NavLink to={`/profile/${props.myId}`} className={themes.dynamicClass} activeClassName={themes.dynamicActiveClass}
                > Profile </NavLink></li>}
                { props.myId && <li><NavLink to={'/friends'} className={themes.dynamicClass} activeClassName={themes.dynamicActiveClass}
                > Friends </NavLink></li>}

                { props.myId && <li className={stl.dialogsSpan}>
                    <button disabled={props.btnIsDisabled} onClick={props.getNewMessages} className={isHiddenBTN}>
                        {element}

                       {/* { props.btnIsDisabled && !props.errGettingNewMSGSCount ?  <img src={props.msgLoader} alt="err"/>  :
                            <span className={themes.dynamicClass}> '+1?'</span>}*/}
                    </button>
                    <NavLink to={'/dialogs'}
                             className={themes.dynamicClass}
                             activeClassName={themes.dynamicActiveClass}>
                        Dialogs </NavLink>
                    <p className={`${themes.counter}`} hidden={!props.newMSGSCounter}>({props.newMSGSCounter})</p>
                </li>}
                { props.myId && <li><NavLink to={'/users'}
                                             className={themes.dynamicClass}
                                             activeClassName={themes.dynamicActiveClass}> Users </NavLink></li>}
                <li><NavLink to='/news'
                             className={themes.dynamicClass}
                             activeClassName={themes.dynamicActiveClass}> News </NavLink></li>
                <li><NavLink to='/music'
                             className={themes.dynamicClass}
                             activeClassName={themes.dynamicActiveClass}> Music </NavLink></li>
                <li><NavLink to='/settings'
                             className={themes.dynamicClass}
                             activeClassName={themes.dynamicActiveClass}> Settings </NavLink></li>
            </ul>
        </div>
    </>
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        myId:                   state.appAuthReducer.id,
        colorTheme:             state.backgroundReducer.theme,
        dialogACs:              state.dialogACs,
        btnNewMessagesState:    state.dialogsReducer.newMessageBTNDisabled,
        newMSGSCounter:         state.dialogsReducer.newMessagesCounter,
        msgLoader:              state.dialogsReducer.msgLoader,
        errGettingNewMSGSCount: state.dialogsReducer.errGettingNewMSGSCount,
        onErrorPic:             state.dialogsReducer.onError,
    }
};

const mergeProps = (stateProps, dispatchProps) => {
    const  state  = stateProps;
    const { dispatch } = dispatchProps;
    // console.log(state)

    const getNewMessagesRequestThunk =()=> dispatch(state.dialogACs.getNewMessagesRequestThunkAC() );

    return { state, getNewMessagesRequestThunk  }

};

const navBarConnector = connect(mapStateToProps, null, mergeProps)(NavBarContainer)
export default navBarConnector;


// let [isHidden, setIsHidden] = useState(stl.hidden);
// let [element, setElement]   = useState('');
//
// useEffect( ()=> {
//     BTNRenderSelector()
//     // console.log(12)
// }, [props.btnIsDisabled, props.errGettingNewMSGSCount]);
//
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

