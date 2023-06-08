import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImageUrl, tags, modalImageUrl }) => {
  const handleClick = () => {
    modalImageUrl(smallImageUrl, tags);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css['imageGalleryItem-image']}
        src={smallImageUrl}
        alt={tags}
        onClick={handleClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
