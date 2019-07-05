import { IPhoto } from '@/shared/model/photo.model';
import { IMold } from '@/shared/model/mold.model';

export interface IModel {
  id?: number;
  name?: string;
  photos?: IPhoto[];
  molds?: IMold[];
}

export class Model implements IModel {
  constructor(public id?: number, public name?: string, public photos?: IPhoto[], public molds?: IMold[]) {}
}
