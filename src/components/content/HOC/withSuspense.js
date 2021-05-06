import React from 'react';
import stl from './suspense.module.css';

export const withSuspense = (Component) => {
    console.log(Component)
    return () => <React.Suspense fallback={<div className={stl.suspenseLoader}>
        <p className={stl.loaderMessage}> Lazy load is coming... </p>
    </div>}>
        <Component />
    </React.Suspense>
}