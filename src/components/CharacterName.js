import { TextInput } from '@mantine/core';

function CharacterName({ value, onChange, error }) {
  return (
    <TextInput 
      label="Name" 
      placeholder="Name" 
      value={value} 
      onChange={e => onChange(e.target.value)}
      error={error}
    />
  );
}

export default CharacterName;
