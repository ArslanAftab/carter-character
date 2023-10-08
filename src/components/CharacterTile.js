import { Card, Image, Text, Divider } from '@mantine/core';

function CharacterTile({ character, imagePath }) {
    return (
        <Card padding="md" shadow="sm" style={{ maxWidth: '400px', backgroundColor: '#f6f8fa' }}>
            <Image src={imagePath} alt={character.name} caption={character.name} style={{ maxWidth: '100%', borderRadius: '5px' }} />
            <Divider style={{ margin: '12px 0' }} />
            <Text size="xl" weight={500} align="center">{character.name}</Text>
            <Text size="sm" color="gray" style={{ marginBottom: '8px' }}>{character.description}</Text>
            <Text size="sm" color="gray">Gender: {character.gender}</Text>
            <Text size="sm" color="gray">Age: {character.age}</Text>
            <Text size="sm" color="gray">Voice: {character.voice}</Text>
        </Card>
    );
}

export default CharacterTile;
