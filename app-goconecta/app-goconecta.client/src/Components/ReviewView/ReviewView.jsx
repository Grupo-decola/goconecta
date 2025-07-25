import { List, Progress, Text, Flex, Group, Rating } from "@mantine/core";
import classes from "./ReviewView.module.css";

export default function ReviewView() {
  return (
    <div>
      <Text fw={700} size="lg" >
        Luxury Beach Getaway
      </Text>
      <Flex
        mih={50}
        gap="lg"
        justify="center"
        align="flex-start"
        direction="row"
        wrap="nowrap"
      >
        <div>
          <Text fw={800} size="lg">
            4.8
          </Text>
          <Rating value={4.8} fractions={4} readOnly />
          <Text>400 reviews</Text>
        </div>
        <List listStyleType="none">
          {[
            { score: 5, value: 70 },
            { score: 4, value: 20 },
            { score: 3, value: 5 },
            { score: 2, value: 3 },
            { score: 1, value: 2 },
          ].map(({ score, value }) => (
            <List.Item key={score} classNames={{ itemLabel: classes.score }}>
              <Group gap="xs" align="center" style={{ minWidth: 220 }}>
                <Text style={{ width: 16, textAlign: "right" }}>{score}</Text>
                <Progress value={value} w={100} />
                <Text
                  style={{ width: 32, textAlign: "left" }}
                >{`${value}%`}</Text>
              </Group>
            </List.Item>
          ))}
        </List>
      </Flex>
    </div>
  );
}
