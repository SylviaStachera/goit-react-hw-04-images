import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './ImageGallery.module.css';

const ImageGallery = ({ images }) => (
  <ul className={css.imageGallery}>
    {images.map(({ id, tags, webformatURL, largeImageURL }) => (
      <ImageGalleryItem key={id}>
        tags={tags}
        smallImageUrl={webformatURL}
      </ImageGalleryItem>
    ))}
  </ul>
);

export default ImageGallery;
