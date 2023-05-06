import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export const EmblaCarousel = ({ children }) => {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, autoplay: true }, [Autoplay()]);

  return (
    <div className="embla" ref={viewportRef}>
      <div className="embla__container">
          <div className="embla__slide">
            <img
              src='https://th.bing.com/th/id/OIG.cHUHUF_nPBWODK0WzBSB?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn'
              alt='face'
            />
          </div>
          <div className="embla__slide">
            <img
              src='https://th.bing.com/th/id/OIG._pIFJ9TcdmPtQq6dC3Z9?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn'
              alt='eyes'
            />
          </div>
          <div className="embla__slide">
            <img
              src='https://th.bing.com/th/id/OIG.pnd5NHGTaeDMS5kSNisF?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn'
              alt='lips'
            />
          </div>
        </div>
      </div>
    );
  };
  
