import PropTypes from 'prop-types';
import { Component } from 'react';

import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEscKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKeyPress);
  }

  handleEscKeyPress = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImage, alt } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <img src={modalImage} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  modalImage: PropTypes.string,
  alt: PropTypes.string,
};

export default Modal;
