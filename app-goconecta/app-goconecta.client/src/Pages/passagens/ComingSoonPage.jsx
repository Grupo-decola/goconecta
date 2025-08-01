import { Container, Title, Text, Stack, Button } from '@mantine/core';
import { IconRocket } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const ComingSoonPage = () => {
  const navigate = useNavigate();

  return (
    <Container size="sm" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <Stack align="center" gap="md">
        <IconRocket size={100} color="#DA7818" />
        
        <Title order={1}>
          Estamos preparando algo incrível para você!
        </Title>
        
        <Text size="lg" c="dimmed">
          A seção de passagens está sendo renovada para oferecer a melhor experiência de viagem possível. Em breve, você terá acesso a voos incríveis e ofertas exclusivas! Fique ligado.
        </Text>
        
        <Button 
          variant="filled" 
          size="md" 
          mt="xl"
          color="#DA7818"
          onClick={() => navigate('/')}
        >
          Voltar para a Página Inicial
        </Button>
      </Stack>
    </Container>
  );
};

export default ComingSoonPage;