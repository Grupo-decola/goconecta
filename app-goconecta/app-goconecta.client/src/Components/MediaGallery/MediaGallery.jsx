import { Image, SimpleGrid } from "@mantine/core";

export default function MediaGallery() {
  const images = [
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png",
  ];

  return (
    <SimpleGrid cols={3}>
      {images.map((image) => {
        return <Image src={image} />;
      })}
    </SimpleGrid>
  );
}
