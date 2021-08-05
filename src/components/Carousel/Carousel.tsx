import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({ children }) {
  const settings = {
    dots: false,
    infinite: false,
    variableWidth: true,
  }

  return (
    <Slider {...settings}>
      {children}
    </Slider>
  );
};
