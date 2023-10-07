import { TextInput } from '@mantine/core';

function CharacterAge({ value, onChange, error }) {
  return (
    <TextInput 
      label="Age" 
      placeholder="Age"
      type="number"
      value={value}
      onChange={e => onChange(e.target.value)}
      error={error}
    />
  );
}

export default CharacterAge;
