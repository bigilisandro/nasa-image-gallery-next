'use client'
import React, { useState } from "react";
import "./CardImage.css";
import { Card } from "react-bootstrap";
import ModalImage from "../ModalImage";

interface CardImageProps {
  image?: any;
}

const CardImage: React.FC<CardImageProps> = ({ image }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Card
        bg="dark"
        border="dark"
        data-test-id="component-image"
        className="cursor-pointer"
        onClick={handleShow}
      >
        <Card.Img variant="top" src={image.img_src} className="lazy-image" />
      </Card>
      <ModalImage image={image} show={show} handleClose={handleClose} />
    </>
  );
};

export default CardImage;
