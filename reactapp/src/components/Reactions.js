import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import artworksData from '../artworks';

function Reactions() {
  return (
      <div className="d-flex justify-content-center">
        <Card style={{ width: '18rem', border: '0' }}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Button className='rounded-pill' variant="outline-danger">
                <FaHeart /> Like
              </Button>
              <span>0 Likes</span>
            </div>
          </Card.Body>
        </Card>
      </div>
  )
}

export default Reactions
