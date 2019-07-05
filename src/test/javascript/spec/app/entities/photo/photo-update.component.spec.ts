/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import PhotoUpdateComponent from '@/entities/photo/photo-update.vue';
import PhotoClass from '@/entities/photo/photo-update.component';
import PhotoService from '@/entities/photo/photo.service';

import ModelService from '@/entities/model/model.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Photo Management Update Component', () => {
    let wrapper: Wrapper<PhotoClass>;
    let comp: PhotoClass;
    let photoServiceStub: SinonStubbedInstance<PhotoService>;

    beforeEach(() => {
      photoServiceStub = sinon.createStubInstance<PhotoService>(PhotoService);

      wrapper = shallowMount<PhotoClass>(PhotoUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          photoService: () => photoServiceStub,

          modelService: () => new ModelService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.photo = entity;
        photoServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(photoServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.photo = entity;
        photoServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(photoServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
