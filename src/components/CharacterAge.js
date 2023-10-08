import { NumberInput } from '@mantine/core';

function CharacterAge({ value, onChange, error }) {
  return (
    <NumberInput
      label="Age" 
      placeholder="Enter age"
      min={0}
      max={10000}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
}

export default CharacterAge;
