import fetchImages from './services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import { Notify } from 'notiflix';
import { Component } from 'react';

export class App extends Component {
  state = {
    inputValue: '',
    page: 1,
    images: [],
    loading: false,
    error: null,
  };

  handleInputValue = searchQuery => {
    this.setState({ inputValue: searchQuery });
  };

  handlePageChange = numberPage => {
    this.setState({ page: numberPage });
  };

  getImages = async () => {
    const { inputValue, page } = this.state;

    this.setState({ loading: true });

    try {
      const imagesData = await fetchImages(inputValue, page);
      const images = imagesData.hits;
      console.log(images);
      this.setState({ images, loading: false, error: null });
    } catch (err) {
      Notify.failure(`Sorry something went wrong: ${err.message}`);
      this.setState({ error: err, loading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.inputValue !== this.state.inputValue ||
      prevState.page !== this.state.page
    ) {
      this.getImages();
    }
  }

  render() {
    const { images, inputValue, page, loading, error } = this.state;

    return (
      <div className="app">
        <Searchbar
          onInputValue={this.handleInputValue}
          onPageChange={this.handlePageChange}
        />
        {loading && <p>Ładowanie artykułów</p>}
        {error !== null && <p>Wystąpił błąd!</p>}
        <ImageGallery inputValue={inputValue} page={page} images={images} />
      </div>
    );
  }
}
