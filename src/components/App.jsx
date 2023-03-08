import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from 'components/GlobalStyle';
import { AppStyled } from 'components/App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    textSearch: '',
    page: 1,
  };

  handleSubmit = textSearch => {
    this.setState({ textSearch, page: 1 });
  };

  handleLoad = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { textSearch, page } = this.state;
    const { handleSubmit, handleLoad } = this;

    return (
      <AppStyled>
        <GlobalStyle />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
          }}
        />
        <Searchbar onSearch={handleSubmit} />
        <ImageGallery
          textSearch={textSearch}
          handleLoad={handleLoad}
          page={page}
        />
      </AppStyled>
    );
  }
}
