/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ModelDetailComponent from '@/entities/model/model-details.vue';
import ModelClass from '@/entities/model/model-details.component';
import ModelService from '@/entities/model/model.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Model Management Detail Component', () => {
    let wrapper: Wrapper<ModelClass>;
    let comp: ModelClass;
    let modelServiceStub: SinonStubbedInstance<ModelService>;

    beforeEach(() => {
      modelServiceStub = sinon.createStubInstance<ModelService>(ModelService);

      wrapper = shallowMount<ModelClass>(ModelDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { modelService: () => modelServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundModel = { id: 123 };
        modelServiceStub.find.resolves(foundModel);

        // WHEN
        comp.retrieveModel(123);
        await comp.$nextTick();

        // THEN
        expect(comp.model).toBe(foundModel);
      });
    });
  });
});
