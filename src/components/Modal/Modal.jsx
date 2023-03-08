import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalImage } from 'components/Modal/Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalImage src={largeImageURL} alt={tags} />
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  handleKeyDown: PropTypes.func,
  handleBackdropClick: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
