import { Schema, model, Document, Types } from 'mongoose';

export interface IAppointment extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  date: Date;
  reason: string;
  status: string;
}

const appointmentSchema = new Schema<IAppointment>({
  patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  reason: { type: String },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' }
});

export default model<IAppointment>('Appointment', appointmentSchema);
