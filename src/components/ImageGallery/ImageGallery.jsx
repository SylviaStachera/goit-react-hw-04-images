import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

const ImageGallery = ({ images, modalImageUrl }) => {
  return (
    <>
      <ul className={css.imageGallery}>
        {images.map(({ id, tags, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            tags={tags}
            smallImageUrl={webformatURL}
            modalImageUrl={() => modalImageUrl(largeImageURL, tags)}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  modalImageUrl: PropTypes.func,
};

export default ImageGallery;
