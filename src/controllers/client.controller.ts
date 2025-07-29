import { Request, Response } from 'express';
import Client from '../models/Client';

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, address } = req.body;

    const client = await Client.create({
      name,
      email,
      phone,
      company,
      address,
      createdBy: req.user?.userId,
    });

    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create client', error: err });
  }
};

export const getClients = async (_req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch clients', error: err });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching client', error: err });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: 'Error updating client', error: err });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting client', error: err });
  }
};
