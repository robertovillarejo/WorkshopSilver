import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ModelService from '../model/model.service';
import { IModel } from '@/shared/model/model.model';

import AlertService from '@/shared/alert/alert.service';
import { IPhoto, Photo } from '@/shared/model/photo.model';
import PhotoService from './photo.service';

const validations: any = {
  photo: {
    photo: {
      required
    },
    footer: {
      maxLength: maxLength(25)
    }
  }
};

@Component({
  validations
})
export default class PhotoUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('photoService') private photoService: () => PhotoService;
  public photo: IPhoto = new Photo();

  @Inject('modelService') private modelService: () => ModelService;

  public models: IModel[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.photoId) {
        vm.retrievePhoto(to.params.photoId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.photo.id) {
      this.photoService()
        .update(this.photo)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('workshopSilverApp.photo.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.photoService()
        .create(this.photo)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('workshopSilverApp.photo.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrievePhoto(photoId): void {
    this.photoService()
      .find(photoId)
      .then(res => {
        this.photo = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.photo && field && fieldContentType) {
      if (this.photo.hasOwnProperty(field)) {
        this.photo[field] = null;
      }
      if (this.photo.hasOwnProperty(fieldContentType)) {
        this.photo[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.modelService()
      .retrieve()
      .then(res => {
        this.models = res.data;
      });
  }
}
