export const fetchPackages = async () => {
  // Simula um atraso da API
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Pacotes mockados com imagens reais
  return [
    {
      id: 1,
      title: 'Explore the Wonders of Kyoto',
      destination: 'Kyoto, Japan',
      price: 2500,
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      duration: 7,
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=200&fit=crop',
      rating: 4.8,
      reviewCount: 125,
      featured: true
    },
    {
      id: 2,
      title: 'Discover the Magic of Santorini',
      destination: 'Santorini, Greece',
      price: 1800,
      startDate: '2024-04-10',
      endDate: '2024-04-17',
      duration: 7,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=200&fit=crop',
      rating: 4.9,
      reviewCount: 203,
      featured: false
    },
    {
      id: 3,
      title: 'Experience the Thrill of the Amazon',
      destination: 'Amazon Rainforest, Brazil',
      price: 1200,
      startDate: '2024-05-20',
      endDate: '2024-05-27',
      duration: 7,
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=200&fit=crop',
      rating: 4.6,
      reviewCount: 87,
      featured: false
    }
  ];
};