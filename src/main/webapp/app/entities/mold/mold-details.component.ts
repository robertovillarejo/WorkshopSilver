import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMold } from '@/shared/model/mold.model';
import MoldService from './mold.service';

@Component
export default class MoldDetails extends Vue {
  @Inject('moldService') private moldService: () => MoldService;
  public mold: IMold = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.moldId) {
        vm.retrieveMold(to.params.moldId);
      }
    });
  }

  public retrieveMold(moldId) {
    this.moldService()
      .find(moldId)
      .then(res => {
        this.mold = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
