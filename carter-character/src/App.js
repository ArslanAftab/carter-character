import React, { useState, useCallback } from 'react';
import { Container, Text, Button, Textarea, TextInput, Select, Group, rem, Image } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconZoomReplace } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';

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
    const file = acceptedFiles[0];
    setCharacter({ ...character, image: file });
    notifications.show({
      title: 'Image uploaded',
      message: 'Great! Your character has an image now.',
    });
  }, [character]);

  const removeImage = () => {
    setCharacter({ ...character, image: null });
  };

  const renderDropzoneContent = () => {
    if (character.image) {
      return (
        <Group direction="column" align="center" spacing="md">
          <Image src={URL.createObjectURL(character.image)} width={100} height={100} fit="contain" />
          <Button onClick={removeImage} leftSection={<IconZoomReplace />} color="red">
            Replace Image
          </Button>
        </Group>
      );
    }

    return (
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }} stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }} stroke={1.5} />
        </Dropzone.Idle>
        <div>
          <Text size="xl" inline>Drag images here or click to select files</Text>
          <Text size="sm" c="dimmed" inline mt={7}>Upload your image here</Text>
        </div>
      </Group>
    );
  };
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
            {renderDropzoneContent()}
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
            // TODO: Submit form or perform next action
          }
        }}
      >
        {step < 6 ? 'Next' : 'Submit'}
      </Button>
    </Container>
  );
}

export default App;
