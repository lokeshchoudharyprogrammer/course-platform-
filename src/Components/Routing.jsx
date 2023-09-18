import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import Dashboard  from './Dashboard'
import { CreateStory } from './CreateStory'
import  SingleStory  from './SingleStory'

export const Routing = () => {
  return (
   <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route  path='/create-story' element={<CreateStory/>}/>
    <Route path="/story/:storyId" element={<SingleStory/>} />
   </Routes>
  )
}
