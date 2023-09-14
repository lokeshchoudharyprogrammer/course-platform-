import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    topic: String,
    desc: String,
    subject_id: Number,
    class_id: Number,
    section_id: Number,
    staff_id: Number,
    date_created: {
      type: Date,
      default: Date.now,
    },
    last_date: Date,
    status: {
      type: String,
      enum: ['active', 'nonactive'],
      default: 'active', 
    },
});


const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment