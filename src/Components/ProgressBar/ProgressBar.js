import React from 'react'
  
const ProgressBar = ({bgcolor,progress,height}) => {
     
    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: '#E1E1E1',
        borderRadius: 40,
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius:40,
        textAlign: 'right'
      }
      
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
      </div>
    </div>
    )
}
  
export default ProgressBar;