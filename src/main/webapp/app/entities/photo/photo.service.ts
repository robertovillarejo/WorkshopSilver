import axios from 'axios';

import { IPhoto } from '@/shared/model/photo.model';

const baseApiUrl = 'api/photos';

export default class PhotoService {
  public find(id: number): Promise<IPhoto> {
    return new Promise<IPhoto>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl).then(function(res) {
        resolve(res);
      });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>(resolve => {
      axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public create(entity: IPhoto): Promise<IPhoto> {
    return new Promise<IPhoto>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IPhoto): Promise<IPhoto> {
    return new Promise<IPhoto>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public getAllByModel(idModel: number) {
    return new Promise<any>(resolve => {
      axios.get(`api/models/${idModel}/photos`).then(function(res) {
        resolve(res);
      });
    });
  }
}
