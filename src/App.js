import React, { useState} from 'react';
import { stepsConfig } from './stepsConfig';
import CharacterTile from './components/CharacterTile';
import StepNavigationButtons from './components/StepNavigationButtons';
import { Container, Text, Button, Progress, Transition } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';

function App() {
  const [step, setStep] = useState(0);
  const progress = ((step + 1) / stepsConfig.length) * 100;
  const [errorMessage, setErrorMessage] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [completionData, setCompletionData] = useState(null);
  const TRANSITION_DURATION = 300;

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

  const changeStep = (newStep) => {
    setIsTransitioning(false);
    setTimeout(() => {
      setStep(newStep);
      setIsTransitioning(true);
    }, TRANSITION_DURATION);
  };

  const handleNextClick = () => {
    // Force validate the current step before proceeding
    const validationResult = stepsConfig[step].validate(character[stepsConfig[step].key]);
    if (!validationResult.valid) {
      setErrorMessage(validationResult.message);
      return; // If there's an error, don't proceed to the next step
    }

    if (step < stepsConfig.length - 1) {
      changeStep(prev => prev + 1);
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
          setCompletionData(response.data);
          setIsComplete(true);
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
      changeStep(prev => prev - 1);
      setErrorMessage(''); // Reset error message on navigating back
    }
  };

  const CurrentStepComponent = stepsConfig[step].component;
  
  if (isComplete) {
    return (
        <Container size={400} style={{ marginTop: 50 }}>
            <Text align="center" size="xl">Character Creation Complete!</Text>
            <CharacterTile character={character} imagePath={`http://localhost:8000${completionData.image_path}`} /> {/* <-- Modified this line */}
        </Container>
    );
  }
  return (
    <Container size={400} style={{ marginTop: 50 }}>
      <Text align="center" size="xl">
        Create your character <br/>
        Step {step + 1}: 
      </Text>
      <Progress
        style={{ margin: '20px 0' }}
        value={progress}
        size="xs"
      />
      <Transition
        mounted={isTransitioning}
        transition="fade"
        duration={TRANSITION_DURATION}
      >
        {(styles) => (
          <div style={styles}>
            <CurrentStepComponent
              value={character[stepsConfig[step].key]}
              onChange={(value) => handleValueChange(stepsConfig[step].key, value)}
              error={errorMessage}
            />
          </div>
        )}
      </Transition>
      <StepNavigationButtons 
        step={step} 
        onPrev={handlePrevClick} 
        onNext={handleNextClick}
        isLastStep={step === stepsConfig.length - 1}
      />

    </Container>
  );
}

export default App;
