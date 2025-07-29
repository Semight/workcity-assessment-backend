// src/models/Project.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  status: 'ongoing' | 'completed' | 'pending';
  deadline: Date;
  client: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['ongoing', 'completed', 'pending'],
      default: 'pending',
    },
    deadline: { type: Date, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
