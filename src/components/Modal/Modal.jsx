import css from './Modal.module.css';

const Modal = ({ modalImage, alt }) => (
  <div className={css.overlay}>
    <div className={css.modal}>
      <img src={modalImage} alt={alt} />
    </div>
  </div>
);

export default Modal;
