import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { Component } from 'react';
import { getImages } from 'services/getApp';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { List, Item } from 'components/ImageGallery/ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    more: false,
    page: 1,
    perPage: 12,
  };

  componentDidUpdate(prevProps, prevState) {
    const { textSearch } = this.props;
    const { page, perPage } = this.state;

    if (prevProps.textSearch !== textSearch || prevState.page !== page) {
      this.setState({ loading: true });

      getImages(textSearch.trim(), page, perPage)
        .then(images => {
          if (prevProps.textSearch !== textSearch) {
            toast.success(`We found ${images.totalHits} images`);
            this.setState({ images: [...images.hits], page: 1 });
          } else {
            this.setState({
              images: [...this.state.images, ...images.hits],
            });
          }

          if (images.hits.length === perPage) {
            this.setState({ more: true });
          }

          if (images.totalHits <= page * perPage) {
            toast.error(`You reached end of search results`);
            this.setState({ more: false });
          }
        })
        .catch(error => console.log(error.message))
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  handleLoad = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { loading, more, images } = this.state;
    const { handleLoad } = this;

    return (
      <>
        {loading && <Loader visible={loading} />}
        {images && (
          <List>
            {images.map(image => (
              <Item key={image.id}>
                <ImageGalleryItem image={image} />
              </Item>
            ))}
          </List>
        )}

        {more && <Button onClick={handleLoad} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  textSearch: PropTypes.string.isRequired,
  page: PropTypes.number,
  handleLoad: PropTypes.func,
};
