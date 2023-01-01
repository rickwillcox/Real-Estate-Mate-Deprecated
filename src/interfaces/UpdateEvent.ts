export interface UpdateEvent {
  updatedField: string;
  updatedValue: string;
  lastValue?: string;
  lastCreatedDate?: string;
  createdDate: string;
  createdTime: string;
}
