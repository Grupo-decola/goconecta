import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import classes from "./ImageCarousel.module.css";

const images = [
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png",
];

export default function ImageCarousel() {
  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image radius="md" h={200} w="auto" fit="contain" src={url} />
    </Carousel.Slide>
  ));
  return (
    <Carousel height={200} classNames={classes}>
      {slides}
    </Carousel>
  );
}
