import React from 'react';

export const Layout = ({content}) => (
    <div className='main-layout'>
        <header>
            <a href='/'><h1>Messenger</h1></a>
        </header>
        <main>
            {content}
        </main>
    </div>
)