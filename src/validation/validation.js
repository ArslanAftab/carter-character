const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_DESCRIPTION_LENGTH = 500;
const MIN_DESCRIPTION_LENGTH = 10;
const ACCEPTED_GENDERS = ['Male', 'Female', 'Other'];
const MAX_NAME_LENGTH = 100;
const MIN_NAME_LENGTH = 1;
const MIN_AGE = 0;
const MAX_AGE = 10000;
const ACCEPTED_VOICES = ['Soprano', 'Alto', 'Tenor', 'Bass'];

// TODO: Ensure that DB contains list of options (MIME, gender, voice)
// in order to ensure that frontend/validation methods are consistent!

export const validateDescription = (description) => {
  if (description.trim().length < MIN_DESCRIPTION_LENGTH) {
    return { valid: false, message: `Description should be at least ${MIN_DESCRIPTION_LENGTH} characters.` };
  }
  
  if (description.trim().length > MAX_DESCRIPTION_LENGTH) {
    return { valid: false, message: `Description should be less than ${MAX_DESCRIPTION_LENGTH} characters.` };
  }

  return { valid: true, message: '' };
};

export const validateImage = (image) => {
  if (!image) {
    return { valid: false, message: 'Please provide an image.' };
  }

  if (!ACCEPTED_IMAGE_MIME_TYPES.includes(image.type)) {
    return { valid: false, message: `Invalid image format. Accepts only ${ACCEPTED_IMAGE_MIME_TYPES.join(", ")}.` };
  }

  if (image.size > MAX_IMAGE_SIZE) {
    const maxSizeMB = MAX_IMAGE_SIZE / (1024 * 1024);
    return { valid: false, message: `Image size should be less than ${maxSizeMB}MB.` };
  }

  return { valid: true, message: '' };
};

export const validateName = (name) => {
  const nameLength = name.trim().length;
  if (nameLength === 0) {
    return { valid: false, message: 'Name is required.' };
  }

  if (nameLength < MIN_NAME_LENGTH || nameLength > MAX_NAME_LENGTH) {
    return { valid: false, message: `Name should be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.` };
  }

  return { valid: true, message: '' };
};

export const validateGender = (gender) => {
  if (!ACCEPTED_GENDERS.includes(gender)) {
    return { valid: false, message: `Gender should be one of ${ACCEPTED_GENDERS.join(", ")}.` };
  }
  return { valid: true, message: '' };
};

export const validateAge = (age) => {
  if (age === undefined || age === null) {
    return { valid: false, message: 'Age is required.' };
  }

  if (age < MIN_AGE || age > MAX_AGE) {
    return { valid: false, message: `Age should be between ${MIN_AGE} and ${MAX_AGE} years.` };
  }

  return { valid: true, message: '' };
};

export const validateVoice = (voice) => {
  // Check if voice is in the list of accepted voices
  if (!ACCEPTED_VOICES.includes(voice)) {
    return { valid: false, message: `Voice type should be one of: ${ACCEPTED_VOICES.join(", ")}.` };
  }
  return { valid: true, message: '' };
};

// TODO: Currently unused, but can be extended to work with '/src/stepsConfig.js'
// I.e. Parse stepsConfig.js to take form elements and validate with defined criteria
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
