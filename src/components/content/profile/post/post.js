import React from 'react';
import stl from './post.module.css';
import Avatar from './img/someava.jpg'

function Post (props) {
    return props.props.map(msg =>
            <div className={stl.post} key={msg.id}>
                <div className={stl.avatar}>
                    <img src={Avatar} alt="err"/>
                </div>
                <div className={stl.message} >
                    <p className={stl.dateIndexer}>WAS WRITTEN {msg.date} AT {msg.time}</p>
                    <p className={stl.messageText}>{msg.message}</p>
                    <p className={stl.likesCounter}> {msg.likesCount}  ♥ Likes</p>
                </div>
            </div>
        )
    };

export default Post;

