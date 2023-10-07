import React, { useState, useCallback } from 'react';
import { Container, Text, Button, Textarea, TextInput, Select, Notification, Group, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useNotifications } from '@mantine/notifications';

function App() {
  const [step, setStep] = useState(1);
  const [character, setCharacter] = useState({
    description: '',
    image: null,
    name: '',
    gender: '',
    age: '',
    voice: ''
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      setCharacter({ ...character, image: file });
    }
  }, [character]);

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <Textarea 
            label="Describe your character" 
            placeholder="Description" 
            value={character.description} 
            onChange={(event) => setCharacter({...character, description: event.target.value})} 
            minRows={4}
          />
        );
      case 2:
        return (
          <Dropzone
            onDrop={onDrop}
            accept={IMAGE_MIME_TYPE}
            maxSize={5 * 1024 ** 2}
          >
            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <IconUpload
                  style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed 5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
        );

      case 3:
        return (
          <TextInput 
            label="Name" 
            placeholder="Name" 
            value={character.name} 
            onChange={(event) => setCharacter({...character, name: event.target.value})}
          />
        );
      case 4:
        const genders = ['Male', 'Female', 'Other'];
        return (
          <Select 
            label="Gender" 
            data={genders} 
            value={character.gender} 
            onChange={(val) => setCharacter({...character, gender: val})}
          />
        );
      case 5:
        return (
          <TextInput 
            label="Age" 
            type="number" 
            placeholder="Age" 
            value={character.age.toString()} // Convert number to string
            onChange={(event) => setCharacter({...character, age: event.target.value})}
          />
        );
      case 6:
        const voices = ['Voice 1', 'Voice 2', 'Voice 3'];
        return (
          <Select 
            label="Select Voice" 
            data={voices} 
            value={character.voice} 
            onChange={(val) => setCharacter({...character, voice: val})}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container size={400} style={{ marginTop: 50 }}>
      <Text align="center" size="xl">
        Create your character <br/>
        Step {step}: 
      </Text>
      {renderStep()}
      <Button style={{ marginTop: 20 }} onClick={() => setStep(step - 1)} disabled={step === 1}>
        Previous
      </Button>
      <Button
        style={{ marginLeft: 10 }}
        onClick={() => {
          if(step < 6) {
            setStep(step + 1);
          } else {
            // Submit form or perform next action
          }
        }}
      >
        {step < 6 ? 'Next' : 'Submit'}
      </Button>
    </Container>
  );
}

export default App;
