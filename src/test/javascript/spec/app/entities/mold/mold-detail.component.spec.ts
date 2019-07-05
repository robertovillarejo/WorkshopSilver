/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import MoldDetailComponent from '@/entities/mold/mold-details.vue';
import MoldClass from '@/entities/mold/mold-details.component';
import MoldService from '@/entities/mold/mold.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Mold Management Detail Component', () => {
    let wrapper: Wrapper<MoldClass>;
    let comp: MoldClass;
    let moldServiceStub: SinonStubbedInstance<MoldService>;

    beforeEach(() => {
      moldServiceStub = sinon.createStubInstance<MoldService>(MoldService);

      wrapper = shallowMount<MoldClass>(MoldDetailComponent, { store, i18n, localVue, provide: { moldService: () => moldServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundMold = { id: 123 };
        moldServiceStub.find.resolves(foundMold);

        // WHEN
        comp.retrieveMold(123);
        await comp.$nextTick();

        // THEN
        expect(comp.mold).toBe(foundMold);
      });
    });
  });
});
