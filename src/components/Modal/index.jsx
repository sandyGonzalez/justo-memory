import React from 'react'
import './modal.css'

const Modal = ({
  handleClose,
  children,
  width,
  height,
}) => {
  
  const handleClick = (event) => {
    event.stopPropagation()
  }

  return (
    <div className='overlay' onClick={handleClose}>
      <div
        className='w-11/12 h-60 bg-off-white flex flex-col justify-center items-center rounded-md'
        style={{ width: width && width, height: height && height }}
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
