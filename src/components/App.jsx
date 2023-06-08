import fetchImages from './services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

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

  handlePageChange = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  getImages = async () => {
    const { inputValue, page } = this.state;

    this.setState({ loading: true });

    try {
      const imagesData = await fetchImages(inputValue, page);
      const images = imagesData.hits;
      console.log(images);
      console.log(page);
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
      }));
    } catch (err) {
      Notify.failure(`Sorry something went wrong: ${err.message}`);
      this.setState({ error: err });
    } finally {
      this.setState({ loading: false });
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
    const { images, loading, error } = this.state;

    return (
      <div className="app">
        <Searchbar onInputValue={this.handleInputValue} />
        {loading && <p>Ładowanie artykułów</p>}
        {error !== null && <p>Wystąpił błąd!</p>}
        <ImageGallery images={images} />
        {images.length > 0 && <Button onClick={this.handlePageChange} />}
      </div>
    );
  }
}
