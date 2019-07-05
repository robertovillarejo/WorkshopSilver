import { IModel } from '@/shared/model/model.model';

export interface IPhoto {
  id?: number;
  photoContentType?: string;
  photo?: any;
  footer?: string;
  model?: IModel;
}

export class Photo implements IPhoto {
  constructor(public id?: number, public photoContentType?: string, public photo?: any, public footer?: string, public model?: IModel) {}
}
