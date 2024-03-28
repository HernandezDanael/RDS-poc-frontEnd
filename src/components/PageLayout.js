import React, { useEffect } from 'react';

import { SignInButton } from './SignInButton';

export const PageLayout = (props) => {
  useEffect(() => {
    if (window.location.pathname != '/') {
      window.location.replace('/');
    }
  }, []);

  return (
    <>
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: '#161419',
          }}>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <img style={{ height: 'calc(100% - 160px)', mixBlendMode: 'soft-light' }} src={'liguecomplex.jpg'}></img>          </div>
          <div
            style={{
              opacity: 1,
              height: '158px',
              width: '200px',
              fillOpacity: 1,
              zIndex: 1,
              background: `center / contain no-repeat url(${'logords.png'})`,
            }}></div>
          <div>
            <span style={{ font: 'normal normal bold 116px Montserrat',color: '#ffffffff'  }}>EASY</span>
            <span style={{ font: '116px Montserrat', color: '#ffffffff' }}>Booking PROJECT</span>
          </div>

          <SignInButton />
          <div>
          </div>
        </div>
    
    </>
  );
};
