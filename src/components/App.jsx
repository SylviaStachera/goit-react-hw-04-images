import fetchImages from './services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import { Notify } from 'notiflix';
import { Component } from 'react';

export class App extends Component {
  state = {
    loading: false,
    searchQuery: '',
    images: [],
    page: 1,
    error: null,
  };

  handleFormSubmit = () => {
    const { searchQuery } = this.state;

    this.getImage(searchQuery);
  };

  getImage = async searchQuery => {
    const { page } = this.state;

    this.setState({ loading: true });

    try {
      const imagesData = await fetchImages(searchQuery, page);
      console.log(imagesData);
      const images = imagesData.hits;
      this.setState({ images });
    } catch (err) {
      Notify.failure(`Sorry something went wrong: ${err.message}`);
      this.setState({ error: err });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { images, loading, error } = this.state;

    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <p>Ładowanie artykułów</p>}
        {error !== null && <p>Wystąpił błąd!</p>}
        {images.length > 0 ? <ImageGallery images={images} /> : null}
      </div>
    );
  }
}
