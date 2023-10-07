import { Select } from '@mantine/core';

function CharacterGender({ value, onChange, error }) {
  return (
    <Select 
      label="Gender" 
      placeholder="Select Gender"
      data={['Male', 'Female', 'Other']}
      value={value}
      onChange={val => onChange(val)}
      error={error}
    />
  );
}

export default CharacterGender;
