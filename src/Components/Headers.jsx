import React from 'react'
import { Flex, Spacer, Heading, Button, Box, Badge, Avatar, Text, Container } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
export const Headers = () => {
    
    const navigate = useNavigate();
    const RedirecttoStroy = () => {
        navigate("/create-story");
    }
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
            <Container h="220px" maxW='2xl' centerContent>
                <Box padding='4' marginTop="70px" color='black' maxW='md'>
                    <Button onClick={RedirecttoStroy} colorScheme='blue'>Create Own Story</Button>
                </Box>
            </Container>
        </>
    )
}
