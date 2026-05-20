import mongoose, { Schema, Document } from 'mongoose';

export interface ILeadDocument extends Document {
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const LeadSchema = new Schema<ILeadDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Lost'], default: 'New' },
    source: { type: String, enum: ['Website', 'Instagram', 'Referral'], required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Text index for search by name or email
LeadSchema.index({ name: 'text', email: 'text' });
// Regular indexes for filters
LeadSchema.index({ status: 1 });
LeadSchema.index({ source: 1 });
LeadSchema.index({ createdAt: -1 });

export default mongoose.model<ILeadDocument>('Lead', LeadSchema);