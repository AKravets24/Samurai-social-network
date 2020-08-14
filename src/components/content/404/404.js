import React from 'react';
import stl from './notFound.module.css'
import japanSun from './../../../redux/img/404/japanSunRed1.png'
import samurai from './../../../redux/img/404/samurai.png'

const NotFound = () => {

    return <div className={stl.background}>
        <div className={stl.header}><h1> 404 Page not found </h1></div>
        <div className={stl.wrapper}>
            <div className={stl.samurai}/>
            <div className={stl.japanSun}/>
        </div>
    </div>

};
export default NotFound;
