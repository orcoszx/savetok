import React from 'react';
import {
  Center,
  Button,
  Tabs,
  Card,
  Text,
  Image,
  Skeleton,
} from '@mantine/core';
import { IconReportSearch, IconHistory } from '@tabler/icons';

const VideoResult = ({ video, loader }) => {
  const noVideoData = Object.keys(video).length === 0;
  return (
    <Tabs
      defaultValue='result'
      keepMounted={false}
      color='grape'
      sx={{ margin: '2em auto', width: '300px' }}
    >
      <Tabs.List position='center'>
        <Tabs.Tab value='result' icon={<IconReportSearch size={14} />}>
          Result
        </Tabs.Tab>
        <Tabs.Tab value='history' icon={<IconHistory size={14} />}>
          History
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='result' pt='xs'>
        {noVideoData ? null : (
          <Card shadow='sm' p='md' radius='md' withBorder>
            <Card.Section>
              <Image src={video.cover} height={200} alt='Norway' />
            </Card.Section>
            <Text weight={500} mt='md'>
              {video.author.nickname}
            </Text>
            <Text size='sm' color='dimmed'>
              {video.title}
            </Text>
            <Center>
              <Button color='grape' mt='md'>
                Download
              </Button>
            </Center>
          </Card>
        )}

        {loader ? (
          <Card shadow='sm' p='md' radius='md' withBorder>
            <Card.Section>
              <Skeleton height={200} />
            </Card.Section>
            <Skeleton height={8} mt='md' />
            <Skeleton height={8} mt='md' />
            <Skeleton height={8} mt='xs' />
            <Skeleton height={8} mt='xs' />
            <Center>
              <Skeleton height={8} mt='md' width='50%' />
            </Center>
          </Card>
        ) : null}
      </Tabs.Panel>

      <Tabs.Panel value='history' pt='xs'>
        History
      </Tabs.Panel>
    </Tabs>
  );
};

export default VideoResult;
