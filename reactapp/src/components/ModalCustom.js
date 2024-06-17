import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ModalCustom = ({ show, handleClose }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        handleClose();
        navigate('/login');
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>Please log in</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleLogin}>
                    Go Log In
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCustom;
