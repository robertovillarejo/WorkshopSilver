import { Component, Vue, Inject } from 'vue-property-decorator';

import { IModel } from '@/shared/model/model.model';
import { IPhoto } from '@/shared/model/photo.model';

import PhotoService from '../photo/photo.service';
import ModelService from './model.service';

@Component
export default class ModelDetails extends Vue {
  @Inject('modelService') private modelService: () => ModelService;
  public model: IModel = {};

  public index = null;

  @Inject('photoService') private photoService: () => PhotoService;

  public photos: IPhoto[] = [];

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.modelId) {
        vm.retrieveModel(to.params.modelId);
        vm.initRelationships(to.params.modelId);
      }
    });
  }

  public retrieveModel(modelId) {
    this.modelService()
      .find(modelId)
      .then(res => {
        this.model = res;
      });
  }

  public initRelationships(idModel: number): void {
    if (idModel) {
      this.photoService()
        .getAllByModel(idModel)
        .then(res => {
          this.photos = res.data;
        });
    }
  }

  public previousState() {
    this.$router.go(-1);
  }

  public gallery() {
    return this.photos.map(photo => {
      return `${window.location.origin}/api/images/${photo.id}`;
    });
  }
}
