import React, {useEffect, useRef} from 'react';

function ImagePopup(props) {
  const { image, handleClosePopup, handleShareMe } = props;
  const popupEl = useRef(null);

  useEffect(() => {
    popupEl.current.style.opacity = "1";
  }, []);

  return (
    <div className="image-popup" ref={popupEl}>
      <div className="image-popup__overlay" onClick={handleClosePopup} />
      <div className="image-popup__image">
        <img src={image.cropped_picture} alt={image.cropped_picture} />
        <div className="image-popup__share" onClick={() => {
          handleShareMe(image.cropped_picture)
        }}>
          Share me!:)
        </div>
        <div className="image-popup__note">
          no fullscreen photo, author name, camera model and hashtags<br/>
          image data:
          {JSON.stringify(image)}
        </div>
      </div>
    </div>
  )
}

export default ImagePopup;
