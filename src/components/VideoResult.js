import React from 'react';
import {
  Center,
  Button,
  Tabs,
  Card,
  Text,
  Image,
  Skeleton,
  Alert,
} from '@mantine/core';
import { IconReportSearch, IconAlertCircle, IconHistory } from '@tabler/icons';
import VideoHistory from './VideoHistory';
import { db } from '../db';

const VideoResult = ({ video, link, loader, invalidLink }) => {
  const noVideoData = Object.keys(video).length === 0;

  //The best download implementation
  const downloadVideo = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;

    link.setAttribute('target', '_blank');
    link.setAttribute('download', `${filename}.mp4`);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);

    // Save history
    save();
  };

  const save = async () => {
    // data.cover data.title data.play
    const id = await db.history.add({
      cover: video.cover,
      title: video.title,
      url: link,
    });

    console.log(id);
  };

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
              <Button
                color='grape'
                mt='md'
                onClick={() => downloadVideo(video.play, video.id)}
              >
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

        {invalidLink ? (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title='Invalid link!'
            color='red'
            mt={50}
          >
            Link pasted is not a tiktok link.
          </Alert>
        ) : null}
      </Tabs.Panel>

      <Tabs.Panel value='history' pt='xs'>
        <VideoHistory />
      </Tabs.Panel>
    </Tabs>
  );
};

export default VideoResult;
