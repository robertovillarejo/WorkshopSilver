import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ModelService from '../model/model.service';
import { IModel } from '@/shared/model/model.model';

import AlertService from '@/shared/alert/alert.service';
import { IMold, Mold } from '@/shared/model/mold.model';
import MoldService from './mold.service';

const validations: any = {
  mold: {
    number: {
      required
    },
    size: {}
  }
};

@Component({
  validations
})
export default class MoldUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('moldService') private moldService: () => MoldService;
  public mold: IMold = new Mold();

  @Inject('modelService') private modelService: () => ModelService;

  public models: IModel[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.moldId) {
        vm.retrieveMold(to.params.moldId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.mold.models = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.mold.id) {
      this.moldService()
        .update(this.mold)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('workshopSilverApp.mold.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.moldService()
        .create(this.mold)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('workshopSilverApp.mold.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveMold(moldId): void {
    this.moldService()
      .find(moldId)
      .then(res => {
        this.mold = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.modelService()
      .retrieve()
      .then(res => {
        this.models = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
