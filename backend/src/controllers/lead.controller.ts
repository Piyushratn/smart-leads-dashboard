import { Response, NextFunction } from 'express';
// @ts-ignore
import { Parser } from 'json2csv';
import Lead from '../models/Lead';
import { AuthRequest, LeadQuery, PaginationMeta } from '../types';

export const getLeads = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, source, search, sort = 'latest', page = '1', limit = '10' }: LeadQuery = req.query as LeadQuery;

    const filter: Record<string, unknown> = {};

    if (status) filter.status = status;
    if (source) filter.source = source;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Sales users only see their own leads
    if (req.user?.role === 'sales') {
      filter.createdBy = req.user.id;
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;
    const sortOrder = sort === 'oldest' ? 1 : -1;

    const [leads, total] = await Promise.all([
      Lead.find(filter).sort({ createdAt: sortOrder }).skip(skip).limit(limitNum).populate('createdBy', 'name email'),
      Lead.countDocuments(filter),
    ]);

    const meta: PaginationMeta = {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    };

    res.json({ success: true, data: leads, meta });
  } catch (error) {
    next(error);
  }
};

export const getLead = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id).populate('createdBy', 'name email');
    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }
    res.json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const createLead = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lead = await Lead.create({ ...req.body, createdBy: req.user!.id });
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }
    res.json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }
    res.json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    next(error);
  }
};

export const exportCSV = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filter: Record<string, unknown> = {};
    if (req.user?.role === 'sales') filter.createdBy = req.user.id;

    const leads = await Lead.find(filter).lean();
    const fields = ['name', 'email', 'status', 'source', 'createdAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(leads);

    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(csv);
  } catch (error) {
    next(error);
  }
};