import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Flex, Spacer, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

import axios from 'axios';
import { CreateStory } from './CreateStory';
import { Headers } from './Headers';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    // Fetch story data from the backend
    setLoading(true)
    axios.get('https://enthusiastic-lime-starfish.cyclic.cloud/api/get-stories') // Replace with your backend endpoint
      .then((response) => {
        setStories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error); // Set error state if there's an error
        setLoading(false);
        console.error('Error fetching stories:', error);
      });
    setLoading(false)
  }, [stories]);

  // Function to handle liking a story
  const handleLikeStory = (storyId) => {
    // /api/upvotes-story
    axios.post('https://enthusiastic-lime-starfish.cyclic.cloud/api/upvotes-story', { storyId }) // Replace with your backend endpoint
      .then((response) => {
        // Update the local state or UI to reflect the new like count
        const updatedStories = stories.map((story) => {
          if (story._id === storyId) {
            return { ...story, likes: response.data.likes };
          }
          return story;
        });
        setStories(updatedStories);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating story like:', error);
      });
    // Send a request to the backend to update the like count for the story with the given storyId
    // You need to implement this functionality on your backend
  };
  const handleDownloadStory = (storyContent) => {
    // Create a Blob (binary large object) with the story content
    const blob = new Blob([storyContent], { type: 'text/plain' });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary anchor element for downloading
    const a = document.createElement('a');
    a.href = url;
    a.download = +Math.random() + 'story.txt'; // Set the filename for the downloaded file
    a.click();

    // Release the temporary URL
    window.URL.revokeObjectURL(url);
  };


  const handleShareStory = (id) => {
    console.log(id)
    let textToCopy=`https://storyai-nine.vercel.app/story/${id}`
     navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('link copied to clipboard successfully!');
      })
      .catch((error) => {
        console.error('Unable to copy link: ', error);
      });
  };
  return (

    <div className="App">
      <Headers />
      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

          <Spinner size='xl' thickness='5px'
            speed='0.65s' color='red.500' />
        </div>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          An error occurred: {error.message}
        </Alert>
      ) :
        <div className="grid-container">

          {stories.reverse().map((story) => (
            <Box key={story._id} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
              <Heading size="lg">{story.prompt}</Heading>
              <Text mt={2} mb={4}>{story.content.slice(0, 120) + '...'}</Text>


              <Flex>
                <Button colorScheme="teal" onClick={() => handleLikeStory(story._id)}>
                  Like
                </Button>
                <Spacer />
                <Button colorScheme="blue" onClick={() => handleShareStory(story._id)}>
                 Share
                </Button>
                <Spacer />
                <Button colorScheme="green" onClick={() => handleDownloadStory(story.content)}>
                  Download
                </Button>
                <Spacer />
                <Text>Likes: {story.upvotes}</Text>
              </Flex>
            </Box>
          ))}
        </div>}
    </div >

  );

}

export default Dashboard;
