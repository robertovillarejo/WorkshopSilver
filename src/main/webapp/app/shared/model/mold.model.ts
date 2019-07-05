import { IModel } from '@/shared/model/model.model';

export const enum SizeModel {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

export interface IMold {
  id?: number;
  number?: string;
  size?: SizeModel;
  models?: IModel[];
}

export class Mold implements IMold {
  constructor(public id?: number, public number?: string, public size?: SizeModel, public models?: IModel[]) {}
}
