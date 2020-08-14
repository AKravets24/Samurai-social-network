import React from "react";
import stl from "./statusBlock.module.css";

export class StatusClass extends React.Component {
    constructor(props) { super(props);
        // console.log(props);

        this.state = {
            statusEdit: false,
            fieldMaxLength: 300,
            // fieldBalanceLength: 300 - this.props.statusField.length,
            fieldBalanceLength: '',
            statusField: this.props.statusField,
            previousStatus: this.props.previousStatus,
        };
    };

    componentDidUpdate(prevProps, prevState,snapshot) {

        // console.log(this.props.statusField)
        // console.log(this.props.previousStatus)

        if (prevProps.statusField !== this.props.statusField) {
            this.setState({statusField: this.props.statusField})
        }

        if ( this.props.statusField && prevProps.statusField ){
            if (this.props.statusField.length !== prevProps.statusField.length) {
                this.setState({fieldBalanceLength: this.state.fieldMaxLength - this.props.statusField.length})
            }
        }
    }

    statusChangeListener = ({target}) => {
        let {value} = target;
        let {fieldMaxLength} = this.state;
        this.props.stateChanger(value);
        this.setState( {fieldBalanceLength: fieldMaxLength - value.length});
        this.setState( {statusField: value});
    };

    statusEditOn  = () => { this.setState({statusEdit: true  }) };
    statusEditOff = () => { this.setState({statusEdit: false }) };

    confirmStatus = ()  => {
        this.props.updateStatusThunk(this.state.statusField);
        this.setState({statusField: this.props.statusField});
        this.statusEditOff()
    };

    rejectStatus = () => {
        this.setState({statusField: this.state.previousStatus });
        this.statusEditOff();
    };

    render() {
        window.onclick = ({target}) => {
            let {id} = target;
            if (this.state.statusEdit === true  &&  !id){
                this.setState({statusField: this.state.previousStatus });
                this.statusEditOff() }
        };
        window.onkeyup = (e) => {
            if (this.state.statusEdit === true && e.key === "Escape"){
                this.setState({statusField: this.state.previousStatus });
                this.statusEditOff()}
        };

        return(
            !this.state.statusEdit
                ? <div className={stl.statusWrapper}>
                    <h2 className={stl.statusField}
                        id='statusField'
                        onClick={ this.props.isMe ? this.statusEditOn : null} > Status: {this.state.statusField} </h2>
                </div>
                :
                <div className={stl.modalWindow}
                     id='modalWindow'>
                        <textarea autoFocus={true}
                                  maxLength={this.state.fieldMaxLength}
                                  className={stl.statusTextArea}
                                  id='statusInput'
                                  value={this.state.statusField}
                                  onChange={this.statusChangeListener}
                                  placeholder={'write your mind here'}
                        />

                    <div id ='counter'> {this.state.fieldBalanceLength} symbols left </div>

                    <div className={stl.twoBTNs} id='twoBTNs'>
                        <button className={stl.BTNChangeSaver}
                                onClick={this.confirmStatus}> Apply changes
                        </button>
                        <button className={stl.BTNChangeReject}
                                onClick={this.rejectStatus}> Reject changes
                        </button>
                    </div>
                </div>
        )
    }
};
