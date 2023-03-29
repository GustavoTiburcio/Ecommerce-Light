import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function BannerCarousel() {
  return (
    <>
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        swipeable={true}
        emulateTouch={true}
        infiniteLoop
        autoPlay
      >
        <div>
          <img src="https://td0295.vtexassets.com/assets/vtex.file-manager-graphql/images/89f637cf-4c7f-4ffc-a536-4d140bb0ea6a___a62a8042fa95fb11808c69a8c4960e97.jpg" />
          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <img src="https://td0295.vtexassets.com/assets/vtex.file-manager-graphql/images/9b2ad342-6030-4154-9769-f4ca97b6ed9c___bc107dbeeb9ecc23e438a8336cd9e003.jpg" />
        </div>
        <div>
          <img src="https://td0295.vtexassets.com/assets/vtex.file-manager-graphql/images/2c9d5c67-2cdc-486c-a6e4-188a0b155828___a1dd43e113160bed5876e96160b85433.jpg" />
        </div>
        <div>
          <img src="https://td0295.vtexassets.com/assets/vtex.file-manager-graphql/images/cd395b38-b82d-4fed-85d0-7b449d8432d5___a9bc0a417fd9f547e0306bac4f013283.jpg" />
        </div>
      </Carousel>
    </>
  );
}

export default BannerCarousel;
