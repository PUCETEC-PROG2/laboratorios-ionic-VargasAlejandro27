import React from 'react';
import { IonSpinner } from '@ionic/react';
import './LoadingSpinners.css';

const LoadingSpinners: React.FC = () => {
  return (
    <div className="spinner-overlat">
        <IonSpinner name="circular" color="primary" className="loading-spiner" />
    </div>
  )
}

export default LoadingSpinners;
   