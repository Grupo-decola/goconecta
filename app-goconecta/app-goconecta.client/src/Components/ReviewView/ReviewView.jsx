import { List, Progress, Text, Flex, Group, Rating, Box, Grid } from "@mantine/core";
import classes from "./ReviewView.module.css"; 

export default function ReviewView({ title }) {
  return (
    <Box>
      <Text fw={700} size="lg" mb="md"> 
        {title}
      </Text>
      
      <Grid gutter="md" align="flex-start"> 
        <Grid.Col 
          span={{ base: 12, sm: 4 }} 
          ta={{ base: 'center', sm: 'left' }} 
        >
          <Text fw={800} size="xl"> 
            4.8
          </Text>
          <Rating value={4.8} fractions={4} readOnly size="md" /> 
          <Text size="sm" c="dimmed" mt={4}>400 reviews</Text> 
        </Grid.Col>

        <Grid.Col 
          span={{ base: 12, sm: 8 }}
        >
          <List listStyleType="none" p={0}> 
            {[
              { score: 5, value: 70 },
              { score: 4, value: 20 },
              { score: 3, value: 5 },
              { score: 2, value: 3 },
              { score: 1, value: 2 },
            ].map(({ score, value }) => (
              <List.Item key={score} classNames={{ itemLabel: classes.score }}>
                <Group gap="xs" align="center" wrap="nowrap"> 
                  <Text style={{ width: 16, textAlign: "right", flexShrink: 0 }}>{score}</Text> 
                  <Progress value={value} style={{ flexGrow: 1 }} /> 
                  <Text style={{ width: 32, textAlign: "left", flexShrink: 0 }}>{`${value}%`}</Text>
                </Group>
              </List.Item>
            ))}
          </List>
        </Grid.Col>
      </Grid>
    </Box>
  );
}