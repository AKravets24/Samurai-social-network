import React, {useEffect,useState} from "react";
import stl from "./statusBlock.module.css";

export function StatusCompFunc (props) {
        // console.log(props.colorTheme);

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
        if        (props.colorTheme==='NIGHT'){
            setThemes( {...themes,windowDNMC: stl.mWindow_N,textInput:stl.inputN } )
        } else if (props.colorTheme==='MORNING'){
            setThemes( {...themes,windowDNMC: stl.mWindow_M,textInput:stl.inputM } )
        } else if (props.colorTheme==='DAY'){
            setThemes( {...themes,windowDNMC: stl.mWindow_D,textInput:stl.inputD } )
        } else if (props.colorTheme==='EVENING'){
            setThemes( {...themes,windowDNMC: stl.mWindow_E,textInput:stl.inputE } )
        }
    }, [props.colorTheme] )


    let statusChangeListener=({target})=>{let {value}=target;setFieldBalanceLength(fieldMaxLength-value.length);setStatusFieldValue(value);};
    let confirmStatus=()=>{props.updateStatusThunk(statusFieldValue);setStatusFieldValue(props.statusField);setStatusEdit(false);};
    let rejectStatus = () => {setStatusFieldValue(previousStatus);setStatusEdit(false); };

    window.onmousedown = ({target}) => { let {id} = target; statusEdit  && !id && rejectStatus() };
    window.onkeyup = (e) =>                  { statusEdit  && e.key === "Escape" && rejectStatus() };

    // console.log(props.statusField)

    return <>
        { !statusEdit ?
            <div className={stl.statusWrapper}>
                <p className={stl.statusField}
                    id='statusField'
                    onClick={props.isMe ? ()=>{setStatusEdit(true)}:null}>
                    {/*{props.statusField ? props.statusField : 'Write your status here'}*/}
                    {/*Status: {props.isLoading ? <img src={props.loader} alt='err'/> : props.statusField }*/}
                    {props.statusField ? props.statusField :  props.isMe ? 'Set your status here': null  }
                </p>
            </div>
            :
            <div className={`${stl.modalWindow}  ${themes.windowDNMC}`}
                 id='modalWindow'>
                <textarea autoFocus={true}
                          maxLength={fieldMaxLength}
                          className={`${stl.statusTextArea} ${themes.textInput}`}
                          id='statusInput'
                          value={statusFieldValue}
                          onChange={statusChangeListener}
                          placeholder={'write your mind here'}
                />
                <div id='counter'> {fieldBalanceLength} symbols left</div>
                <div className={stl.twoBTNs} id='twoBTNs'>
                    <button className={stl.BTNChangeSaver}
                            id='applier'
                            onClick={()=>{confirmStatus()}}> Apply changes
                    </button>
                    <button className={stl.BTNChangeReject}
                            id='rejector'
                            onClick={rejectStatus}
                    > Reject changes
                    </button>
                </div>
            </div>
        }
    </>
};


// export class StatusClass extends React.Component {
//     constructor(props) { super(props);
//         // console.log(props);
//
//         this.state = {
//             statusEdit: false,
//             fieldMaxLength: 300,
//             // fieldBalanceLength: 300 - this.props.statusField.length,
//             fieldBalanceLength: '',
//             statusField: this.props.statusField,
//             previousStatus: this.props.previousStatus,
//         };
//     };
//
//     componentDidUpdate(prevProps, prevState,snapshot) {
//         // console.log(this.props.statusField)
//         // console.log(this.props.previousStatus)
//         if (prevProps.statusField !== this.props.statusField) {
//             this.setState({statusField: this.props.statusField})
//         }
//
//         if ( this.props.statusField && prevProps.statusField ){
//             if (this.props.statusField.length !== prevProps.statusField.length) {
//                 this.setState({fieldBalanceLength: this.state.fieldMaxLength - this.props.statusField.length})
//             }
//         }
//     }
//
//     statusChangeListener = ({target}) => {
//         let {value} = target;
//         let {fieldMaxLength} = this.state;
//         this.props.stateChanger(value);
//         this.setState( {fieldBalanceLength: fieldMaxLength - value.length});
//         this.setState( {statusField: value});
//     };
//
//     statusEditOn  = () => { this.setState({statusEdit: true  }) };
//     statusEditOff = () => { this.setState({statusEdit: false }) };
//
//     confirmStatus = ()  => {
//         this.props.updateStatusThunk(this.state.statusField);
//         this.setState({statusField: this.props.statusField});
//         this.statusEditOff()
//     };
//
//     rejectStatus = () => {
//         this.setState({statusField: this.state.previousStatus });
//         this.statusEditOff();
//     };
//
//     render() {
//         window.onclick = ({target}) => {
//             let {id} = target;
//             if (this.state.statusEdit === true  &&  !id){
//                 this.setState({statusField: this.state.previousStatus });
//                 this.statusEditOff() }
//         };
//         window.onkeyup = (e) => {
//             if (this.state.statusEdit === true && e.key === "Escape"){
//                 this.setState({statusField: this.state.previousStatus });
//                 this.statusEditOff()}
//         };
//
//         return(
//             !this.state.statusEdit
//                 ? <div className={stl.statusWrapper}>
//                     <h2 className={stl.statusField}
//                         id='statusField'
//                         onClick={ this.props.isMe ? this.statusEditOn : null} > Status: {this.state.statusField} </h2>
//                 </div>
//                 :
//                 <div className={stl.modalWindow}
//                      id='modalWindow'>
//                         <textarea autoFocus={true}
//                                   maxLength={this.state.fieldMaxLength}
//                                   className={stl.statusTextArea}
//                                   id='statusInput'
//                                   value={this.state.statusField}
//                                   onChange={this.statusChangeListener}
//                                   placeholder={'write your mind here'}
//                         />
//
//                     <div id ='counter'> {this.state.fieldBalanceLength} symbols left </div>
//
//                     <div className={stl.twoBTNs} id='twoBTNs'>
//                         <button className={stl.BTNChangeSaver}
//                                 onClick={this.confirmStatus}> Apply changes
//                         </button>
//                         <button className={stl.BTNChangeReject}
//                                 onClick={this.rejectStatus}> Reject changes
//                         </button>
//                     </div>
//                 </div>
//         )
//     }
// };