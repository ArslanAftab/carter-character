// Validation
import {
  validateDescription,
  validateName,
  validateImage,
  validateGender,
  validateAge,
  validateVoice
} from './validation/validation';

// Components
import CharacterDescription from './components/CharacterDescription';
import CharacterName from './components/CharacterName';
import ImageDrop from './components/ImageDrop';
import CharacterGender from './components/CharacterGender'; 
import CharacterAge from './components/CharacterAge';
import CharacterVoice from './components/CharacterVoice';

// TODO: When extending functionality, frontend & backend
// should always expect the same data, i.e. synchronise
// keys, components etc.


/**
 * Configuration for each step in the character creation process.
 * Each step includes the component to be rendered, validation logic,
 * and the associated key for data collection.
 */

export const stepsConfig = [
  {
    component: CharacterName,
    validate: validateName,
    key: 'name'
  },
  {
    component: CharacterDescription,
    validate: validateDescription,
    key: 'description'
  },
  {
    component: ImageDrop,
    validate: validateImage,
    key: 'image'
  },
  {
    component: CharacterGender,
    validate: validateGender,
    key: 'gender'
  },
  {
    component: CharacterAge,
    validate: validateAge,
    key: 'age'
  },
  {
    component: CharacterVoice,
    validate: validateVoice,
    key: 'voice'
  },
];
