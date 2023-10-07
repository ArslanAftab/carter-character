export const validateDescription = (description) => {
    if (description.trim().length < 10) {
      return { valid: false, message: 'Description should be at least 10 characters.' };
    }
    return { valid: true, message: '' };
  };
  
  export const validateImage = (image) => {
    if (!image) {
      return { valid: false, message: 'Please provide an image.' };
    }
    return { valid: true, message: '' };
  };
  
  export const validateName = (name) => {
    if (name.trim().length === 0) {
      return { valid: false, message: 'Name is required.' };
    }
    return { valid: true, message: '' };
  };
  
  export const validateGender = (gender) => {
    if (gender.trim().length === 0) {
      return { valid: false, message: 'Gender is required.' };
    }
    return { valid: true, message: '' };
  };
  
  export const validateAge = (age) => {
    if (age.trim().length === 0) {
      return { valid: false, message: 'Age is required.' };
    }
    return { valid: true, message: '' };
  };
  
  export const validateVoice = (voice) => {
    if (voice.trim().length === 0) {
      return { valid: false, message: 'Voice selection is required.' };
    }
    return { valid: true, message: '' };
  };
  
  export const validateStep = (currentStep, character) => {
    switch (currentStep) {
      case 1:
        return validateDescription(character.description);
      case 2:
        return validateImage(character.image);
      case 3:
        return validateName(character.name);
      case 4:
        return validateGender(character.gender);
      case 5:
        return validateAge(character.age);
      case 6:
        return validateVoice(character.voice);
      default:
        return { valid: true, message: '' };
    }
  };
  