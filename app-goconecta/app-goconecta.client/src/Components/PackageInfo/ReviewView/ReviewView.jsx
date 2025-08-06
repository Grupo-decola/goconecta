import { List, Progress, Text, Group, Rating, Box, Grid } from "@mantine/core";
import classes from "./ReviewView.module.css";

export default function ReviewView({ title, ratingData }) {
  // Garante que todos os scores de 1 a 5 estejam presentes
  const distribution = [5, 4, 3, 2, 1].map((score) => ({
    score,
    value: ratingData?.ratingDistribution?.[score] ?? 0,
  }));

  return (
    <Box>
      <Text fw={700} size="lg" mb="md">
        {title}
      </Text>

      <Grid gutter="md" align="flex-start">
        <Grid.Col
          span={{ base: 12, sm: 4 }}
          ta={{ base: "center", sm: "left" }}
        >
          <Text fw={800} size="xl">
            {ratingData?.averageRating?.toFixed(1) ?? "-"}
          </Text>
          <Rating
            value={ratingData?.averageRating ?? 0}
            fractions={4}
            readOnly
            size="md"
          />
          <Text size="sm" c="dimmed" mt={4}>
            {ratingData?.totalRatings ?? 0} avaliações
          </Text>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 8 }}>
          <List listStyleType="none" p={0}>
            {distribution.map(({ score, value }) => (
              <List.Item key={score} classNames={{ itemLabel: classes.score }}>
                <Group gap="xs" align="center" wrap="nowrap">
                  <Text
                    style={{ width: 16, textAlign: "right", flexShrink: 0 }}
                  >
                    {score}
                  </Text>
                  <Box
                    style={{
                      flexGrow: 1,
                      minWidth: "160px",
                      width: "100%",
                    }}
                  >
                    <Progress
                      value={value > 0 ? value : 0.5}
                      size={14}
                      radius="xl"
                      color="yellow.6"
                    />
                  </Box>
                  <Text
                    style={{ width: 32, textAlign: "left", flexShrink: 0 }}
                  >{`${value}%`}</Text>
                </Group>
              </List.Item>
            ))}
          </List>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
