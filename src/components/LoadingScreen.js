import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/animations/clapping.json';

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const LoadingScreen = ({...props}) => {
    return (
        <div  style={{background: 'linear-gradient(180deg, #F4F9FF 0%, #EDF1F7 100%)', height: '100vh'}}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
         <div class="d-flex justify-content-center">
         <Lottie options={defaultOptions}
              height={100}
              width={100}
            />
          </div>
          <h1 style={{textAlign: 'center', fontWeight: 300, color: '#86ABE1',  fontSize: 20, letterSpacing: '0.05em', marginTop: 40}}> powerpose </h1>
      </div>
    )
}

export default LoadingScreen;