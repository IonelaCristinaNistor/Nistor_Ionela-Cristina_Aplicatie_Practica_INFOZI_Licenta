import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import artworksData from '../artworks';

class Reactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artworks: artworksData,
      likedArtworks: {},
    };
  }

  handleLike = (id) => {
    this.setState((prevState) => {
      const Liked = prevState.likedArtworks[id] || false;
      return {
        artworks: prevState.artworks.map((artwork) =>
          artwork._id === id
            ? { ...artwork, likes_count: Liked ? artwork.likes_count - 1 : artwork.likes_count + 1 }
            : artwork
        ),
        likedArtworks: {
          ...prevState.likedArtworks,
          [id]: !Liked,
        },
      };
    });
  };

  render() {
    const { artworkId } = this.props;
    const artwork = this.state.artworks.find((artwork) => artwork._id === artworkId);

    if (!artwork) {
      return <div>Artwork not found</div>;
    }

    const isLiked = this.state.likedArtworks[artworkId] || false;

    return (
      <div className="d-flex justify-content-center">
        <Card style={{ width: '18rem', border: '0' }}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Button className='rounded-pill'
                variant={isLiked ? "danger" : "outline-danger"} 
                onClick={() => this.handleLike(artwork._id)}
              >
                <FaHeart /> {isLiked ? "Unlike" : "Like"}
              </Button>
              <span>{artwork.likes_count} Likes</span>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Reactions;
