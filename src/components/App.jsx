import fetchImages from './services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import { Notify } from 'notiflix';
import { useEffect, useState } from 'react';

export const App = ({ searchQuery }) => {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSelectedImage, setIsSelectedImage] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [alt, setAlt] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const resetState = () => {
    setInputValue('');
    setPage(1);
    setImages([]);
  };

  const handleInputValue = searchQuery => {
    if (inputValue === searchQuery) {
      return;
    }
    resetState();

    setInputValue(searchQuery);
  };

  const handlePageChange = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleModalImageUrl = (largeImageURL, tags) => {
    if (modalImage === largeImageURL) {
      return;
    }
    setIsSelectedImage(true);
    setModalImage(largeImageURL);
    setAlt(tags);
  };

  const handleModalClose = () => {
    setIsSelectedImage(false);
  };

  const handleSubmit = () => {
    setIsFormSubmitted(true);
  };

  useEffect(() => {
    const getImages = async () => {
      if (isFormSubmitted && inputValue && page) {
        setIsLoading(true);

        try {
          const imagesData = await fetchImages(inputValue, page);
          const images = imagesData.hits;
          setImages(prevImage => [...prevImage, ...images]);
        } catch (error) {
          Notify.failure(`Sorry something went wrong: ${error.message}`);
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    getImages();
  }, [inputValue, page, isFormSubmitted]);

  return (
    <div className="app">
      <Searchbar onInputValue={handleInputValue} onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} modalImageUrl={handleModalImageUrl} />
      )}
      {images.length > 0 && <Button onClick={handlePageChange} />}
      {isSelectedImage && (
        <Modal modalImage={modalImage} alt={alt} onClose={handleModalClose} />
      )}
    </div>
  );
};
