import React from 'react'
import { Alert } from 'react-bootstrap'

function Message({ variant, children }) {
  return (
    <Alert variant = { variant } className='rounded' >
      {children}
    </Alert>
  )
}

export default Message
