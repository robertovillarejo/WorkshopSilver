/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import MoldUpdateComponent from '@/entities/mold/mold-update.vue';
import MoldClass from '@/entities/mold/mold-update.component';
import MoldService from '@/entities/mold/mold.service';

import ModelService from '@/entities/model/model.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Mold Management Update Component', () => {
    let wrapper: Wrapper<MoldClass>;
    let comp: MoldClass;
    let moldServiceStub: SinonStubbedInstance<MoldService>;

    beforeEach(() => {
      moldServiceStub = sinon.createStubInstance<MoldService>(MoldService);

      wrapper = shallowMount<MoldClass>(MoldUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          moldService: () => moldServiceStub,

          modelService: () => new ModelService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.mold = entity;
        moldServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(moldServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.mold = entity;
        moldServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(moldServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
