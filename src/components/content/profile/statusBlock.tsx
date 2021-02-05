import { TargetElement } from "@testing-library/user-event";
import React, { useEffect,useState} from "react";
import stl from "./statusBlock.module.css";


type StatusProps = {
    colorTheme: string
    errOnStatusLoading: string
    errOnStatusUpdate: string
    isLoading: boolean
    isMe: boolean
    loader: string
    statusField: string
    updateStatusThunk: (text:string) => void
}

export function StatusCompFunc (props:StatusProps) {
        // console.log(props);

    const [statusEdit, setStatusEdit]                 = useState(false);
    const fieldMaxLength = 300;
    const [fieldBalanceLength, setFieldBalanceLength] = useState(0);
    const [statusFieldValue, setStatusFieldValue]     = useState('')
    const [previousStatus, setPreviousStatus]         = useState('')

    useEffect(()=> {
        setStatusFieldValue(props.statusField)
        setPreviousStatus  (props.statusField)
        props.statusField!==null&&setFieldBalanceLength(fieldMaxLength-props.statusField.length )
    },[props.statusField] )

    let [themes, setThemes] = useState({windowDNMC:'',textInput:''})

    useEffect( ()=> {
        if      (props.colorTheme==='NIGHT'  )setThemes({...themes,windowDNMC:stl.mWindow_N,textInput:stl.inputN})
        else if (props.colorTheme==='MORNING')setThemes({...themes,windowDNMC:stl.mWindow_M,textInput:stl.inputM})
        else if (props.colorTheme==='DAY'    )setThemes({...themes,windowDNMC:stl.mWindow_D,textInput:stl.inputD})
        else if (props.colorTheme==='EVENING')setThemes({...themes,windowDNMC:stl.mWindow_E,textInput:stl.inputE})
    }, [props.colorTheme] )

    let statusChangeListener=({target}:any)=>{let {value}=target;setFieldBalanceLength(fieldMaxLength-value.length);setStatusFieldValue(value);};
    let confirmStatus=()=>{props.updateStatusThunk(statusFieldValue);setStatusFieldValue(props.statusField);setStatusEdit(false);};
    let rejectStatus = () => {setStatusFieldValue(previousStatus); setFieldBalanceLength(fieldMaxLength-previousStatus.length); setStatusEdit(false);  };

    window.onkeyup = ({key}:any) => { statusEdit&&key==="Escape"&&rejectStatus() };

    let modalCloser= ({target}:React.MouseEvent<HTMLDivElement>)=>{
        let el=target as HTMLInputElement; el.getAttribute('data-name')==='modalBackground'&&setStatusEdit(false)
    }

    let changeColor1 =(e:any)=>{console.log(e.target.parentElement.parentElement.className=stl.first )}
    let changeColor2 =(e:any)=>{console.log(e.target.parentElement.parentElement.className=stl.second)}

    // console.log(props)

    return <>
            <div className={stl.statusWrapper}>
                <p className={`${stl.statusField} ${props.errOnStatusUpdate && stl.statusError}`}
                   onClick={props.isMe ? (e:React.MouseEvent)=>{setStatusEdit(true)}:undefined}>
                    {props.errOnStatusLoading ?
                        props.errOnStatusLoading : props.errOnStatusUpdate ?
                            props.errOnStatusUpdate : props.statusField ?
                                props.statusField : props.isMe ?
                                    'Set your status here' : null
                    }
                </p>
            </div>
        { statusEdit && <div className={`${stl.modalBackground}`} data-name='modalBackground' 
        onMouseDown={modalCloser}>
                <div className={`${stl.modalWindow}  ${themes.windowDNMC}`}>
                <textarea autoFocus={true}
                          maxLength={fieldMaxLength}
                          className={`${stl.statusTextArea} ${themes.textInput}`}
                          value={statusFieldValue}
                          onChange={statusChangeListener}
                          placeholder={'write your mind here'}
                />
                    <div> {fieldBalanceLength} symbols left</div>
                    <div className={stl.twoBTNs} >
                        <button className={stl.BTNChangeSaver}  onClick={()=>{confirmStatus()}}> Apply changes</button>
                        <button className={stl.BTNChangeReject} onClick={rejectStatus}> Reject changes </button>
                        <button onClick={e=>{changeColor1(e)}}>1</button>
                        <button onClick={e=>{changeColor2(e)}}>2</button>
                    </div>
                </div>
            </div>
        }
    </>
};


// let modalCloser= ({target}:any)=>{target.attributes['data-name']?.value==='modalBackground'&&setStatusEdit(false)} - изначальная не типизированная версия




// import React, {useEffect,useState} from "react";
// import stl from "./statusBlock.module.css";

// export function StatusCompFunc (props) {
//         // console.log(props.errOnStatusUpdate);

//     const [statusEdit, setStatusEdit]                 = useState(false);
//     const fieldMaxLength = 300;
//     const [fieldBalanceLength, setFieldBalanceLength] = useState(0);
//     const [statusFieldValue, setStatusFieldValue]     = useState('')
//     const [previousStatus, setPreviousStatus]         = useState('')

//     useEffect(()=> {
//         setStatusFieldValue(props.statusField)
//         setPreviousStatus  (props.statusField)
//         props.statusField!==null&&setFieldBalanceLength(fieldMaxLength-props.statusField.length )
//     },[props.statusField] )

//     let [themes, setThemes] = useState({windowDNMC:'',textInput:''})

//     useEffect( ()=> {
//         if      (props.colorTheme==='NIGHT'  )setThemes({...themes,windowDNMC:stl.mWindow_N,textInput:stl.inputN})
//         else if (props.colorTheme==='MORNING')setThemes({...themes,windowDNMC:stl.mWindow_M,textInput:stl.inputM})
//         else if (props.colorTheme==='DAY'    )setThemes({...themes,windowDNMC:stl.mWindow_D,textInput:stl.inputD})
//         else if (props.colorTheme==='EVENING')setThemes({...themes,windowDNMC:stl.mWindow_E,textInput:stl.inputE})
//     }, [props.colorTheme] )

//     let statusChangeListener=({target})=>{let {value}=target;setFieldBalanceLength(fieldMaxLength-value.length);setStatusFieldValue(value);};
//     let confirmStatus=()=>{props.updateStatusThunk(statusFieldValue);setStatusFieldValue(props.statusField);setStatusEdit(false);};
//     let rejectStatus = () => {setStatusFieldValue(previousStatus); setFieldBalanceLength(fieldMaxLength-previousStatus.length); setStatusEdit(false);  };

//     window.onkeyup = (e) => { statusEdit  && e.key === "Escape" && rejectStatus() };

//     let modalCloser=(e)=>{e.target.attributes.name&&e.target.attributes.name.value==='modalBackground'&&setStatusEdit(false)}

//     let changeColor1 =(e)=>{console.log(e.target.parentElement.parentElement.className=stl.first )}
//     let changeColor2 =(e)=>{console.log(e.target.parentElement.parentElement.className=stl.second)}

//     // console.log(props)

//     return <>
//             <div className={stl.statusWrapper}>
//                 <p className={`${stl.statusField} ${props.errOnStatusUpdate && stl.statusError}`}
//                    onClick={props.isMe ? ()=>{setStatusEdit(true)}:null}>
//                     {props.errOnStatusLoading ?
//                         props.errOnStatusLoading : props.errOnStatusUpdate ?
//                             props.errOnStatusUpdate : props.statusField ?
//                                 props.statusField : props.isMe ?
//                                     'Set your status here' : null
//                     }
//                 </p>
//             </div>
//         { statusEdit && <div className={`${stl.modalBackground}`} name='modalBackground' onMouseDown={e=>{modalCloser(e)}}>
//                 <div className={`${stl.modalWindow}  ${themes.windowDNMC}`}>
//                 <textarea autoFocus={true}
//                           maxLength={fieldMaxLength}
//                           className={`${stl.statusTextArea} ${themes.textInput}`}
//                           value={statusFieldValue}
//                           onChange={statusChangeListener}
//                           placeholder={'write your mind here'}
//                 />
//                     <div> {fieldBalanceLength} symbols left</div>
//                     <div className={stl.twoBTNs} >
//                         <button className={stl.BTNChangeSaver}  onClick={()=>{confirmStatus()}}> Apply changes</button>
//                         <button className={stl.BTNChangeReject} onClick={rejectStatus}> Reject changes </button>
//                         <button onClick={e=>{changeColor1(e)}}>1</button>
//                         <button onClick={e=>{changeColor2(e)}}>2</button>
//                     </div>
//                 </div>
//             </div>
//         }
//     </>
// };


