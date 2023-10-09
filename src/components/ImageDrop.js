import React from 'react';
import { Group, Image, Button, rem, Text, Notification } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX, IconZoomReplace } from '@tabler/icons-react';

const ImageDrop = ({ value: image, onChange, error }) => {
  
  const handleImageDrop = (files) => {
    const [file] = files;
    onChange(file); // pass the image file back up to the parent
  };

  const renderDropzoneContent = () => {
    if (image) {
      return (
        <Group direction="column" align="center" spacing="md">
          <Image src={URL.createObjectURL(image)} width={100} height={100} fit="contain" />
          <Button onClick={() => onChange(null)} leftSection={<IconZoomReplace />} color="red">
            Replace Image
          </Button>
        </Group>
      );
    }

    return (
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }} stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }} stroke={1.5} />
        </Dropzone.Idle>
        <div>
          <Text size="xl" inline>Drag image here or click to select files</Text>
          <Text size="sm" c="dimmed" inline mt={7}>Upload your image here</Text>
        </div>
      </Group>
    );
  };

  return (
    <div>
      {error && <Notification color="red" style={{ marginBottom: 10 }}>{error}</Notification>}
      <Dropzone
        onDrop={handleImageDrop}
        accept={IMAGE_MIME_TYPE}
        maxSize={5 * 1024 ** 2}
      >
        {renderDropzoneContent()}
      </Dropzone>
    </div>
  );
}

export default ImageDrop;
