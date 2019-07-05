import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import { IPhoto } from '@/shared/model/photo.model';
import AlertService from '@/shared/alert/alert.service';

import JhiDataUtils from '@/shared/data/data-utils.service';

import PhotoService from './photo.service';

@Component
export default class Photo extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('photoService') private photoService: () => PhotoService;
  private removeId: number = null;
  public photos: IPhoto[] = [];

  public isFetching = false;
  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public mounted(): void {
    this.retrieveAllPhotos();
  }

  public clear(): void {
    this.retrieveAllPhotos();
  }

  public retrieveAllPhotos(): void {
    this.isFetching = true;

    this.photoService()
      .retrieve()
      .then(
        res => {
          this.photos = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IPhoto): void {
    this.removeId = instance.id;
  }

  public removePhoto(): void {
    this.photoService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('workshopSilverApp.photo.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllPhotos();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
