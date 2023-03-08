import PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Image } from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  };

  render() {
    const {
      image: { largeImageURL, webformatURL, tags },
    } = this.props;
    const { isOpen } = this.state;
    const { toggleModal } = this;

    return (
      <>
        <Image onClick={toggleModal} src={webformatURL} alt={tags} />
        {isOpen && (
          <Modal
            onClose={toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
