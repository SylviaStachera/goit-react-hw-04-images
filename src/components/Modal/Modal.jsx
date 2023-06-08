const Modal = ({ modalImage, alt }) => (
  <div className="overlay">
    <div className="modal">
      <img src={modalImage} alt={alt} />
    </div>
  </div>
);

export default Modal;
