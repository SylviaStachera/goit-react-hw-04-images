const ImageGalleryItem = ({ smallImageUrl, tags, bigImgaeUrl }) => (
  <li className="gallery-item">
    <img src={smallImageUrl} alt={tags} />
  </li>
);

export default ImageGalleryItem;
