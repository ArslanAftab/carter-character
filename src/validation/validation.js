const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

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
  
    if (!ACCEPTED_IMAGE_MIME_TYPES.includes(image.type)) {
      return { valid: false, message: 'Invalid image format. Accepts only JPEG, PNG, and GIF.' };
    }
  
    if (image.size > MAX_IMAGE_SIZE) {
      return { valid: false, message: 'Image size should be less than 5MB.' };
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
    if (!voice) {
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
  