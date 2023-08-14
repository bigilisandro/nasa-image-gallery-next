import { Figure, Modal } from "react-bootstrap";
import "./ModalImage.css";

interface ModalImageProps {
  image?: any;
  show?: boolean;
  handleClose?: () => void;
}

const ModalImage: React.FC<ModalImageProps> = ({
  image,
  show,
  handleClose,
}) => {
  return (
    <>
      <Modal
        dialogClassName="modal-fit-content"
        contentClassName="bg-dark"
        data-test-id="modal-image"
        size="lg"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="text-white" closeVariant="white" closeButton>
          <Modal.Title>{image.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Figure>
            <img
              className="w-100"
              src={image.img_src}
              alt={image.alt}
              data-src={image.link}
            />
          </Figure>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-around text-white">
          <div>Camera: {image.camera.full_name}</div>
          <div>Earth Date: {image.earth_date}</div>
          <div>ID: {image.id}</div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalImage;
