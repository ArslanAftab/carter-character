import { Textarea } from '@mantine/core';

function CharacterDescription({ value, onChange, error }) {
  return (
    <Textarea 
      label="Describe your character"
      placeholder="Description"
      value={value}
      onChange={e => onChange(e.target.value)}
      minRows={4}
      error={error}
    />
  );
}

export default CharacterDescription;
