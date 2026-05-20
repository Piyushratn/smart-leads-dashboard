import { Router } from 'express';
import {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  exportCSV
} from '../controllers/lead.controller';
import { protect } from '../middleware/auth';
import { adminOnly } from '../middleware/role';

const router = Router();

router.use(protect);

router.get('/export/csv', exportCSV);
router.get('/', getLeads);
router.get('/:id', getLead);
router.post('/', createLead);
router.patch('/:id', updateLead);
router.delete('/:id', adminOnly, deleteLead);

export default router;