import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import PhotoService from '../photo/photo.service';
import { IPhoto } from '@/shared/model/photo.model';

import MoldService from '../mold/mold.service';
import { IMold } from '@/shared/model/mold.model';

import AlertService from '@/shared/alert/alert.service';
import { IModel, Model } from '@/shared/model/model.model';
import ModelService from './model.service';

const validations: any = {
  model: {
    name: {
      required,
      maxLength: maxLength(30)
    }
  }
};

@Component({
  validations
})
export default class ModelUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('modelService') private modelService: () => ModelService;
  public model: IModel = new Model();

  @Inject('photoService') private photoService: () => PhotoService;

  public photos: IPhoto[] = [];

  @Inject('moldService') private moldService: () => MoldService;

  public molds: IMold[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.modelId) {
        vm.retrieveModel(to.params.modelId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.model.id) {
      this.modelService()
        .update(this.model)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('workshopSilverApp.model.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.modelService()
        .create(this.model)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('workshopSilverApp.model.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveModel(modelId): void {
    this.modelService()
      .find(modelId)
      .then(res => {
        this.model = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.photoService()
      .retrieve()
      .then(res => {
        this.photos = res.data;
      });
    this.moldService()
      .retrieve()
      .then(res => {
        this.molds = res.data;
      });
  }
}
