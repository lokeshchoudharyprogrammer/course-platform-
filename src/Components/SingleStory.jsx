// SingleStory.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CardBody, CardHeader, Card,  Heading,  Flex, Spacer,  Button, Box, Badge, Avatar, Text, Container  } from '@chakra-ui/react';
import { Headers } from './Headers';

function SingleStory() {
    const { storyId } = useParams(); // Access the storyId parameter from the URL
    const [story, setStory] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        // Fetch the specific story based on storyId
        // http://localhost:5000/api/get-stories/
        axios.get(`https://enthusiastic-lime-starfish.cyclic.cloud/api/get-stories/${storyId}`) // Replace with your backend endpoint
            .then((response) => {
 
                setStory(response.data);

            })
            .catch((error) => {
                console.error('Error fetching story:', error);
            });
    }, [storyId]);

    if (!story) {
        return <div>Loading...</div>;
    }
    const RedirecttoDashboard = () => {
        navigate("/");
    }
    return (
        <div>
            <Flex minWidth='max-content' alignItems='center' gap='1' marginBottom='23px' marginTop={"12px"} justifyContent="space-around">
                <Box p='2'>
                    <Heading size='md'>Story Generator AI</Heading>
                </Box>

                <Flex>
                    <Avatar src='https://avatars.githubusercontent.com/u/112642820?v=4' />
                    <Box ml='3'>
                        <Text fontWeight='bold'>
                            Lokesh Choudhary
                            <Badge ml='1' colorScheme='green'>
                                New
                            </Badge>
                        </Text>
                        <Text fontSize='sm'>Full Stack Dev</Text>
                    </Box>
                </Flex>
            </Flex>
            <Button onClick={RedirecttoDashboard} colorScheme='blue'>Back To DashBoard</Button>
            <Card>
                <CardHeader>
                    <Heading size='md'>{story.prompt}</Heading>
                </CardHeader>
                <CardBody>
                    <Text>{story.content}</Text>
                </CardBody>
            </Card>

        </div>
    );
}

export default SingleStory;
