import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import Banner from '../assets/Banner.png';
import bannertwo from '../assets/bannertwo.png';
import bannerthree from '../assets/bannerthree.png';

const CarouselComponent = () => {
  const images = [
    { src: Banner, link: '/products' },
    { src: bannertwo, link: '/products' },
    { src: bannerthree, link: '/products' },
  ];

  return (
    <div className="container mx-auto max-w-screen">
      <Carousel
        showStatus={false}
        showThumbs={false}
        showIndicators={true}
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        transitionTime={900}
        swipeable={true}
        dynamicHeight={false}
        emulateTouch={true}
        className="carousel-wrapper bg-gradient-to-r from-zinc-900 via-pink-950 to-zinc-900"
      >
        {images.map((image, index) => (
        <Link key={index} to={image.link}>
          <div className="relative w-full h-[45vh]">
             <img className="w-full h-full object-cover" src={image.src} alt={`Carousel image ${index}`} />
          </div>
        </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
