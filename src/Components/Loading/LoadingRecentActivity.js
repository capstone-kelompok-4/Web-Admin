import { Skeleton } from '@mui/material';
import React from 'react'

const LoadingRecentActivity = () => {
  return (
    <div>
      <div className='d-flex mb-3'>
        <Skeleton variant="circular" width={40} height={40} style={{marginRight: "20px"}}/> 
        <Skeleton variant="text" width="80%" height="30" animation="wave" />
      </div>
      <div className='d-flex mb-3'>
        <Skeleton variant="circular" width={40} height={40} style={{marginRight: "20px"}}/> 
        <Skeleton variant="text" width="80%" height="30" animation="wave" />
      </div>
      <div className='d-flex mb-3'>
        <Skeleton variant="circular" width={40} height={40} style={{marginRight: "20px"}}/> 
        <Skeleton variant="text" width="80%" height="30" animation="wave" />
      </div>
      <div className='d-flex mb-3'>
        <Skeleton variant="circular" width={40} height={40} style={{marginRight: "20px"}}/> 
        <Skeleton variant="text" width="80%" height="30" animation="wave" />
      </div>
      <div className='d-flex mb-3'>
        <Skeleton variant="circular" width={40} height={40} style={{marginRight: "20px"}}/> 
        <Skeleton variant="text" width="80%" height="30" animation="wave" />
      </div>
    </div>
  )
}

export default LoadingRecentActivity