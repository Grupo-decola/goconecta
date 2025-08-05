import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import styles from "./ImageCarousel.module.css";

export default function ImageCarousel({ images }) {
  const slides = images.map((image) => (
    <Carousel.Slide key={image.path}>
      <Image radius="md" h="100%" fit="cover" src={image.path} alt={image.title} />
    </Carousel.Slide>
  ));

  return (
    <div style={{ display: "flex" }} className={styles.carousel}>
      <Carousel withIndicators height="100%" flex={1}>
        {slides}
      </Carousel>
    </div>
  );
}
