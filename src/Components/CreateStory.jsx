import React, { useState } from 'react'
import {
    Input, Spacer, Container, WrapItem, Button, Flex, Card, CardHeader, CardBody, Text, CloseButton, Heading, CardFooter, Alert,
    AlertIcon,
    AlertTitle, Box,
    AlertDescription, useDisclosure, useToast, Avatar, Badge
} from '@chakra-ui/react'
import { BiLike } from '@chakra-ui/icons'
import { SlLike } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
export const CreateStory = () => {
    const containerStyle = {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        marginTop: '46px',
    };
    const toast = useToast()

    const [generatedStory, setGeneratedStory] = useState('');
    const [storyPrompt, setStoryPrompt] = useState('');

    const navigate = useNavigate();
    const RedirecttoDashboard = () => {
        navigate("/");
    }
    const handleGenerateStory = async () => {
        try {
            const response = await fetch('https://enthusiastic-lime-starfish.cyclic.cloud/api/generate-story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: storyPrompt,
                }),
            });

            if (response.ok) {
                toast({
                    title: 'Generating story.',
                    description: "We've generating story  for you.",
                    status: 'success',
                    duration: 900,
                    isClosable: true,
                    position: 'top-right'
                })
                const data = await response.json();
                setGeneratedStory(data.content);
            } else {
                console.error('Error generating story:', response.statusText);
            }
        } catch (error) {
            toast({
                title: 'Generating story.',
                description: "Error generating story.",
                status: 'error',
                duration: 900,
                isClosable: true,
                position: 'top-right'
            })
            console.error('Error:', error);
        }
    };


    return (
        <>

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

            <Flex style={containerStyle} alignItems='center' gap='2'>

                <Input
                    isInvalid
                    color='teal'
                    width="250px"
                    focusBorderColor='green.400'
                    _placeholder={{ color: 'inherit' }}
                    placeholder="Enter your story prompt..."
                    value={storyPrompt}
                    onChange={(e) => setStoryPrompt(e.target.value)}
                />
                <WrapItem>
                    <Button onClick={handleGenerateStory} colorScheme='green'>Generate Story</Button>
                </WrapItem>
            </Flex>

            <Card>
                <CardHeader style={{}}>
                    <Button onClick={RedirecttoDashboard} colorScheme='blue'>Back To DashBoard</Button>
                    <br />
                    <br />
                    <Heading size='md'>Generated Story</Heading>
                </CardHeader>

                <CardBody>
                    <Text>{generatedStory}</Text>
                </CardBody>


            </Card>

        </>
    )

}
