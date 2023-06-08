import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

import { Component } from 'react';

class ImageGallery extends Component {
  render() {
    const { images } = this.props;

    return (
      <>
        <ul className={css.imageGallery}>
          {images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              tags={tags}
              smallImageUrl={webformatURL}
            />
          ))}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
