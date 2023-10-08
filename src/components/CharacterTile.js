
import { Card, Image, Text } from '@mantine/core';

function CharacterTile({ character, imagePath }) {
    return (
        <Card padding="md" shadow="xs" style={{ maxWidth: '400px' }}>
            <Image src={imagePath} alt={character.name} caption={character.name} style={{ maxWidth: '100%', height: 'auto', marginBottom: '16px' }} />
            <Text size="xl" weight={500}>{character.name}</Text>
            <Text size="md">Description: {character.description}</Text>
            <Text size="md">Gender: {character.gender}</Text>
            <Text size="md">Age: {character.age}</Text>
            <Text size="md">Voice: {character.voice}</Text>
        </Card>
    );
}

export default CharacterTile;
