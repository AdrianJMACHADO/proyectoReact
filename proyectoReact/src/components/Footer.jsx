import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter 
      bgColor='dark' 
      className='text-center text-lg-left fixed-bottom'
      style={{ 
        backgroundColor: '#000000', 
        color: '#F5C518',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 1000
      }}
    >
      <div 
        className='text-center p-3' 
        style={{ 
          backgroundColor: '#000000', 
          color: '#F5C518' 
        }}
      >
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a 
          className='text-decoration-none' 
          href='https://www.cinemax.com/' 
          style={{ 
            color: '#F5C518',
            fontWeight: 'bold'
          }}
        >
          Cinemax.com
        </a>
      </div>
    </MDBFooter>
  );
}