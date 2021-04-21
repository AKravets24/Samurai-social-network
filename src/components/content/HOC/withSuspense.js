import React from 'react';

export const withSuspense = (Component) => {
    return () => <React.Suspense fallback={<div>Loading is coming</div>}>
        <Component />
    </React.Suspense>
}