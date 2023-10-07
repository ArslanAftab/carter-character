import React, { useState } from 'react';
import { stepsConfig } from './stepsConfig';
import { Container, Text, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';

function App() {
  const [step, setStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [character, setCharacter] = useState({
    description: '',
    image: null,
    name: '',
    gender: '',
    age: '',
    voice: ''
  });

  const handleValueChange = (key, value) => {
    // Validate the changed value
    const validationResult = stepsConfig[step].validate(value);
    if (!validationResult.valid) {
      setErrorMessage(validationResult.message);
    } else {
      setErrorMessage('');
    }
    setCharacter(prev => ({ ...prev, [key]: value }));
  };

  const handleNextClick = () => {
    // Force validate the current step before proceeding
    const validationResult = stepsConfig[step].validate(character[stepsConfig[step].key]);
    if (!validationResult.valid) {
      setErrorMessage(validationResult.message);
      return; // If there's an error, don't proceed to the next step
    }

    if (step < stepsConfig.length - 1) {
      setStep(prev => prev + 1);
    } else {
      // Convert the character data to FormData
      const formData = new FormData();
      for (let key in character) {
        formData.append(key, character[key]);
      }

      // Submit the form using FormData
      axios.post('http://localhost:8000/create-character/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          console.log('Response from server:', response.data);
          notifications.show({
            title: 'Character created',
            message: 'Your character has been successfully created!',
            color: 'green',
          });
        })
        .catch(error => {
          console.error('Error submitting character:', error);
          console.error('Validation issues:', error.response.data);
          notifications.show({
            title: 'Error',
            message: 'There was an error submitting your character. Please try again.',
            color: 'red',
          });
        });
    }    
};


  const handlePrevClick = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
      setErrorMessage(''); // Reset error message on navigating back
    }
  };

  const CurrentStepComponent = stepsConfig[step].component;
  
  return (
    <Container size={400} style={{ marginTop: 50 }}>
      <Text align="center" size="xl">
        Create your character <br/>
        Step {step + 1}: 
      </Text>
      <CurrentStepComponent
        value={character[stepsConfig[step].key]}
        onChange={(value) => handleValueChange(stepsConfig[step].key, value)}
        error={errorMessage}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        {step > 0 && (
          <Button onClick={handlePrevClick}>
            Back
          </Button>
        )}
        <Button onClick={handleNextClick} color="blue">
          {step === stepsConfig.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </Container>
  );
}

export default App;
