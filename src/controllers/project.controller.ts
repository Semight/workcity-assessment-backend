// src/controllers/project.controller.ts
import { Request, Response } from 'express';
import Project from '../models/Project';

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, status, deadline, client } = req.body;

    const project = await Project.create({
      title,
      description,
      status,
      deadline,
      client,
      createdBy: req.user?.userId,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create project', error: err });
  }
};

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find().populate('client');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id).populate('client');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project', error: err });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error updating project', error: err });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err });
  }
};

export const getProjectsByClient = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const projects = await Project.find({ client: clientId }).populate('client');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects by client', error: err });
  }
};
