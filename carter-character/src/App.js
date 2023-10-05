import React from 'react';
import { Container, Text, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

function App() {
  return (
    <Container size={400} style={{ marginTop: 50 }}>
      <Text align="center" size="xl">
        First time using the Mantine UI Library
      </Text>
      <Button
        style={{ marginTop: 20 }}
        fullWidth
        onClick={() => {
          notifications.show({
            title: 'Hello from Mantine!',
            message: 'You clicked the button.',
          });
        }}
      >
        Click me!
      </Button>
    </Container>
  );
}

export default App;
