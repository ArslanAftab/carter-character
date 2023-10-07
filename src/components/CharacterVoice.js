import { Select } from '@mantine/core';

function CharacterVoice({ value, onChange, error }) {
  return (
    <Select 
      label="Voice" 
      placeholder="Select Voice"
      data={['Soprano', 'Alto', 'Tenor', 'Bass']}
      value={value}
      onChange={val => onChange(val)}
      error={error}
    />
  );
}

export default CharacterVoice;
