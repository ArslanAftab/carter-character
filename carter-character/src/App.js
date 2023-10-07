import React, { useState, useCallback } from 'react';
import { validateStep } from './validation/validation';
import ImageDrop from './components/ImageDrop';
import { Container, Text, Button, Textarea, TextInput, Select } from '@mantine/core';
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

  const handleNextClick = () => {
    const validationResult = validateStep(step, character);
    if (!validationResult.valid) {
      notifications.show({
        title: 'Validation error',
        message: validationResult.message,
        color: 'red',
      });
    } else {
      if(step < 6) {
        setStep(prevStep => prevStep + 1); // Go to the next step
      } else {
        // Submit the form or any other logic
      }
    }
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
            <ImageDrop 
              image={character.image}
              onDrop={onDrop}
              onReplace={removeImage}
            />
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
        onClick={handleNextClick}
        disabled={!validateStep(step, character).valid}
        >
        {step < 6 ? 'Next' : 'Submit'}
      </Button>
    </Container>
  );
}

export default App;
