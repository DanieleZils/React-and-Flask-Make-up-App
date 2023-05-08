// components/Carousel.js

import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const CarouselComponent = () => {
  const images = [
    'https://th.bing.com/th/id/OIG.tN29kkJBltTXpREwjwPL?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn',
    'https://th.bing.com/th/id/OIG.bKOu9BQPIT0I45l.GhKA?pid=ImgGn',
    'https://th.bing.com/th/id/OIG.7Q4z0HBxIsxY7U2sQqKT?pid=ImgGn'
  ];

  return (
    <div className="w-full h-[30vh]">
      <Carousel
        showStatus={false}
        showThumbs={false}
        showIndicators={true}
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        transitionTime={600}
        swipeable={true}
        dynamicHeight={false}
        emulateTouch={true}
        className="carousel-wrapper"
      >
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-60">
            <img className="w-full h-auto object-cover" src={image} alt={`Carousel image ${index}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
