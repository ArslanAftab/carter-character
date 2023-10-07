import React, { useState } from 'react';
import { stepsConfig } from './stepsConfig';
import { Container, Text, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

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
    setCharacter(prev => ({ ...prev, [key]: value }));
  };

  const handleNextClick = () => {
    const currentStep = stepsConfig[step];
    const validationResult = currentStep.validate(character[currentStep.key]);
    if (!validationResult.valid) {
      setErrorMessage(validationResult.message);
    } else {
      setErrorMessage('');
      if(step < stepsConfig.length - 1) {
        setStep(prev => prev + 1);
      } else {
        // Submit the form
        console.log('Character Data:', character);
        notifications.show({
          title: 'Character created',
          message: 'Your character has been successfully created!',
          color: 'green',
        });
      }
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
