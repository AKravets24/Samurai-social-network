import React, { useState, useEffect } from 'react'
import stl from './chat.module.css'
import { Field, Formik } from 'formik';
import { Button, DatePicker, version, Divider, } from 'antd'
import "antd/dist/antd.css";
import { useDispatch, useSelector } from 'react-redux';
import { getChatACs, getSmartChatReducer } from '../../../redux/selectors';
import { ReadyStatus_Type } from '../../../redux/chatReducer'
import { NavLink } from 'react-router-dom';


type ChatArr_Type = { message: string, photo: string, userId: number, userName: string }

export default function ChatContainer() {

  let smartData = useSelector(getSmartChatReducer)
  let chatACs = useSelector(getChatACs);
  let dispatch = useDispatch()

  console.log(chatACs);


  useEffect(() => {
    dispatch(chatACs.setSocketChannelThunkAC())
    return () => { dispatch(chatACs.setChatArrEmpty()) }
  }, [])

  let chatMSGSender = (msg: string) => {
    try { smartData.webSocket?.send(msg) }
    catch (err) { console.log(err) }
  }


  return <> { smartData.webSocket === null ? null : <Chat chatData={smartData.chatArr} msgSender={chatMSGSender} readyStatus={smartData.readyStatus} defaultAva={smartData.defaultAvatar} />} </>

}



type ChatProps_Type = { chatData: ChatArr_Type[], msgSender: (arg: string) => void, readyStatus: ReadyStatus_Type, defaultAva: string }

let Chat: React.FC<ChatProps_Type> = ({ chatData, msgSender, readyStatus, defaultAva }) => {

  console.log(readyStatus);


  type Value_Type = { text: string }
  type Error_Type = { text?: string }

  let validator = (values: Value_Type) => { let errors: Error_Type = {}; if (!values.text) { errors.text = 'Required' } return errors }

  let submitter = (values: Value_Type, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    msgSender(values.text); values.text = ''; setSubmitting(false);
  }

  return <div className={stl.chatGeneral} >


    <div className={stl.chatWrapper}>
      '** good luck and remember - respect is everything =)) **'
      {chatData.map((el, i) =>
      <div key={i} className={stl.msgBlock}>
        <div className={stl.avaAndLink}>
          <img src={el.photo ? el.photo : defaultAva} alt="Err" />
          <NavLink to={`/profile/${el.userId}`}
          // className={props.themes.dynamicClass} 
          // activeClassName={props.themes.dynamicActiveClass}
          >{el.userName}  {el.userId}</NavLink>
        </div>

        <div className={stl.msgBody}> {el.message} </div>
      </div>
    )}
    </div>


    <div className={stl.formSender}>
      <Formik initialValues={{ text: '' }} validate={validator} onSubmit={submitter}>
        {({ values, errors, handleChange, handleSubmit, isSubmitting, setSubmitting }) => (
          <form onSubmit={handleSubmit} className={stl.formik} >
            <Field name="text" onChange={handleChange} value={values.text} placeholder={errors.text} as='textarea'
              className={stl.inputer}
            // className={`${stl.txtAreaField} ${themes.textAreaDynamic}`} 
            />
            <Button
              type="primary"
              htmlType="submit" disabled={isSubmitting && readyStatus === 'opened'} /* className={`${stl.sendBTN} ${themes.sendBTNDynamic}`} */
              className={`${stl.sendBTN}`}
            > Send </Button>
            {/* <span className={stl.respect}>{'And remember - respect is everything =))'}</span> */}
          </form>
        )}
      </Formik>
    </div>

  </div>
}


// let createChannel = () => {
//   if (ws !== null) { ws?.removeEventListener('close', createChannel); ws?.close() }
//   // webChannel !== null && webChannel.removeEventListener('close', createChannel);
//   ws = new WebSocket(`wss://social-network.samuraijs.com/handlers/ChatHandler.ashx`)
//   // let newWebChannel = new WebSocket(`wss://social-network.samuraijs.com/handlers/ChatHandler.ashx`)
//   ws?.addEventListener('close', () => { setReadyStatus('closed'); setTimeout(createChannel, 3000) })
//   setWebChannel(ws)
// }
// createChannel()
//============================================================================================================================





  // console.log(smartData)

  // let [webChannel, setWebChannel] = useState<WebSocket | null>(null)
  // let [chatArr, setChatArr] = useState<ChatArr_Type[]>([])
  // let [readyStatus, setReadyStatus] = useState<ReadyStatus_Type>('pending')

  // useEffect(() => {
  //   let ws: WebSocket;

  //   let createChannel = () => {
  //     if (ws !== null) { ws?.removeEventListener('close', createChannel); ws?.close() }
  //     ws = new WebSocket(`wss://social-network.samuraijs.com/handlers/ChatHandler.ashx`)
  //     // ws?.addEventListener('close', () => { 
  //     //   setReadyStatus('closed'); setTimeout(createChannel, 3000) 
  //     // })
  //     setWebChannel(ws)
  //   }
  //   createChannel()

  //   return () => {
  //     webChannel !== null && webChannel.close();
  //     webChannel !== null && webChannel.removeEventListener('close', createChannel)
  //   };
  // }, [])

  // useEffect(() => {

  //   webChannel?.addEventListener('open', (e: Event) => {
  //     setReadyStatus('opened')
  //     // console.log(e)
  //   })

  //   webChannel?.addEventListener('message', (e: MessageEvent) => {
  //     setChatArr((prevChatArr) => [...JSON.parse(e.data).reverse(), ...prevChatArr])
  //   })
  // }, [webChannel])



  // let chatMSGSender = (msg: string) => {
  //   try { webChannel?.send(msg) }
  //   catch (err) { console.log(err) }
  // }


    // return <> { webChannel === undefined ? null : <Chat chatData={chatArr} msgSender={chatMSGSender} readyStatus={readyStatus} />} </>