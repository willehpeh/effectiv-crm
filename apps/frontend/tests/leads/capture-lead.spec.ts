import { ApiLeadsFacade } from '../../src/app/leads/facades/api.leads.facade';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { CaptureLeadDto } from '@effectiv-crm/application';
import { provideState, provideStore } from '@ngrx/store';
import { leadsFeatureKey, leadsReducer } from '../../src/app/leads/state/leads.reducer';
import { provideEffects } from '@ngrx/effects';
import { LeadsEffects } from '../../src/app/leads/state/leads.effects';
import { LeadsApiService } from '../../src/app/leads/services/leads-api.service';

describe('Capture Lead', () => {
  let facade: ApiLeadsFacade;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ApiLeadsFacade,
        LeadsApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideStore(),
        provideState({
          name: leadsFeatureKey,
          reducer: leadsReducer
        }),
        provideEffects([LeadsEffects])
      ]
    });
    facade = TestBed.inject(ApiLeadsFacade);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should capture the lead', () => {
    const dto: CaptureLeadDto = {
      contactInfo: {
        lastName: 'Alexander',
        firstName: 'Will',
        email: 'will@will.com',
        company: 'Effectiv Tech'
      },
      leadDetails: {
        source: 'website',
        contactType: 'email',
        contactDate: new Date().toISOString(),
        details: 'This is a test lead'
      }
    };
    facade.captureLead(dto);
    const req = httpCtrl.expectOne('/api/leads/capture');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(dto);
  });

  afterEach(() => {
    httpCtrl.verify();
  });
});
