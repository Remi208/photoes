import React from 'react';

function ImagesGrid(props) {
  const { images } = props;
  return (
    <div className="images-grid">
      {images}
    </div>
  )
}

export default ImagesGrid;
