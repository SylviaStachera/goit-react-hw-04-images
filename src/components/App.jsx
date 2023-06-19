import fetchImages from './services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import { Notify } from 'notiflix';
import { useCallback, useEffect, useRef, useState } from 'react';

export const App = ({ searchQuery }) => {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSelectedImage, setIsSelectedImage] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [alt, setAlt] = useState(null);

  const inputValueRef = useRef();
  const pageRef = useRef();

  const resetState = () => {
    setInputValue('');
    setPage(1);
    setImages([]);
  };

  const handleInputValue = useCallback(
    searchQuery => {
      if (inputValue === searchQuery) {
        return;
      }
      resetState();

      setInputValue(searchQuery);
    },
    [inputValue]
  );

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

  const getImages = useCallback(async () => {
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
  }, [inputValue, page]);

  useEffect(() => {
    const prevInputValue = inputValueRef.current;
    const prevPage = pageRef.current;

    if (
      inputValue &&
      page &&
      (prevInputValue !== inputValue || prevPage !== page)
    ) {
      getImages();
    }

    inputValueRef.current = inputValue;
    pageRef.current = page;
  }, [inputValue, page, getImages]);

  return (
    <div className="app">
      <Searchbar
        forwardRef={(inputValueRef, pageRef)}
        onInputValue={handleInputValue}
      />
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
