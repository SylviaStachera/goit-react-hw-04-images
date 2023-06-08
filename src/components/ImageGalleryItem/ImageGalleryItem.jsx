const ImageGalleryItem = ({ smallImageUrl, tags, modalImageUrl }) => {
 
  const handleClick = () => {
    modalImageUrl(smallImageUrl, tags);
  };


  return (
    <li className="gallery-item">
      <img src={smallImageUrl} alt={tags} onClick={handleClick} />
    </li>
  );
};

export default ImageGalleryItem;
