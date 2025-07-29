import { ActionIcon } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

function Button() {
  return (
    <ActionIcon size={42} variant="default" aria-label="ActionIcon with size as a number">
      <IconHeart size={24} />
    </ActionIcon>
  );
}

export default Button;