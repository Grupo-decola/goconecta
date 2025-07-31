import { Image, SimpleGrid } from "@mantine/core";

export default function MediaGallery() {
  const images = [
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png",
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
  ];

  return (
    <SimpleGrid 
      cols={{ base: 1, xs: 2, sm: 3, md: 4 }} 
      spacing="md" 
    >
      {images.map((image, index) => {
        return (
          <Image 
            key={index} 
            src={image} 
            alt={`Galeria de Mídia ${index + 1}`} 
            h={200} 
            fit="cover" 
            radius="md" 
          />
        );
      })}
    </SimpleGrid>
  );
}
