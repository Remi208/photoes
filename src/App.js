import React, {useState, useEffect, useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import ImagesGrid from "./components/ImagesGrid";
import ImagePopup from "./components/ImagePopup";

function App() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [images, setImages] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  const getToken = async () => {
    try {
      const response = await fetch('http://interview.agileengine.com/auth', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          apiKey: "23567b218376f79d9415"
        }),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getImages = async (token) => {
    try {
      const response = await fetch('http://interview.agileengine.com/images', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleClosePopup = () => {
    setTimeout(() => {
      setActiveImage(null);
    }, 300);
  };

  const handleShareMe = (imageUrl) => {
    navigator.clipboard.writeText(imageUrl);
  };

  const renderImages = useCallback(() => images && !!images.pictures.length && images.pictures.map(image => (
    <div key={image.id}>
      <img src={image.cropped_picture} alt={image.cropped_picture} onClick={() => {
        setActiveImage(image);
      }} />
    </div>
  )), [images]);

  useEffect(async () => {
    setIsPageLoaded(true);

    const auth = await getToken();
    const dataImages = await getImages(auth.token);
    setImages(dataImages);
  }, []);

  return (
    <div className="App">
      {
        isPageLoaded
          ? (
            <>
              <ImagesGrid
                images={renderImages()}
              />
              {
                !!activeImage && (
                  <ImagePopup
                    image={activeImage}
                    handleClosePopup={handleClosePopup}
                    handleShareMe={handleShareMe}
                  />
                )
              }
            </>
          )
          : (
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </header>
          )
      }
    </div>
  );
}

export default App;
