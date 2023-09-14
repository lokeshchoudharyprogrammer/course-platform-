
import  express from 'express'
const router = express.Router();
import mongoose from 'mongoose'
// const Assignment = mongoose.model('Assignment');
import  Assignment from "../model/Assignment.Model.js"

// POST request to create an assignment
router.post('/', async (req, res) => {
  try {
    const assignmentData = req.body;
    const assignment = new Assignment(assignmentData);
    const result = await assignment.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET request to retrieve all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT request to update the status of an assignment
router.put('/:id', async (req, res) => {
  const assignmentId = req.params.id;
  const { status } = req.body;

  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      { status },
      { new: true }
    );

    if (!updatedAssignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE request to delete an assignment
router.delete('/:id', async (req, res) => {
  const assignmentId = req.params.id;

  try {
    const deletedAssignment = await Assignment.findByIdAndRemove(assignmentId);

    if (!deletedAssignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router