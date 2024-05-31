import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function SpinnerComponent() {
  return (
    <Spinner animation='border' role='status' style = {{ height: '150px', width: '150px', borderWidth: '16px',
     margin: 'auto', display: 'block', color: 'indigo', boxShadow: '0 5px 5px rgba(0, 0, 0, 0.1)'}}>
        <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}
