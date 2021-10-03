import { ReactNode } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

interface CarouselProps {
  children: ReactNode
  settings?: Settings
}

export default function Carousel({ children, settings }: CarouselProps) {
  const defaultSettings: Settings = {
    dots: false,
    infinite: false,
    variableWidth: false,
    ...settings,
  }

  return <Slider {...defaultSettings}>{children}</Slider>
}
