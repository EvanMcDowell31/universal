// angular
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { of as observableOf } from 'rxjs';
import { flow } from 'lodash/fp';
import { Store } from '@ngrx/store';

// framework
import { MaterialModule } from '~/app/framework/material';
import { EMPTY_UNIQUE_ID } from '~/app/framework/ngrx';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { getState, NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { t } from '~/app/framework/testing';
import { MOCK_AIRLINE } from '~/app/store/testing';

// shared
import { CardModule } from '~/app/shared/card';
import { RenderFlag, SharedModule } from '~/app/shared';

// store
import { AIRLINE, Airline, airlineActions } from '~/app/store';

// module
import { AirlineDetailContainerComponent } from './airline-detail-container.component';
import { AirlineDetailComponent } from './airline-detail.component';

const testModuleConfig = (renderFlag = RenderFlag.Create) => {
  TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
      RouterTestingModule,
      MaterialModule,
      CoreTestingModule,
      I18NTestingModule,
      NgrxTestingModule,
      SharedModule,
      CardModule
    ],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          data: observableOf({
            renderFlag,
            meta: {
              title: 'PAGE_TITLE'
            }
          }),
          params: observableOf({
            id: renderFlag === RenderFlag.Update
              ? MOCK_AIRLINE._id
              : EMPTY_UNIQUE_ID
          })
        }
      }
    ],
    declarations: [
      AirlineDetailContainerComponent,
      AirlineDetailComponent
    ]
  });
};

t.describe('ng-seed/universal', () => {
  t.describe('+air-universal/airline/airline-detail-container: AirlineDetailContainerComponent', () => {
    t.be(() => testModuleConfig());

    t.it('should build without a problem', () => {
      const fixture = TestBed.createComponent(AirlineDetailContainerComponent);
      const instance = fixture.componentInstance;

      fixture.detectChanges();

      t.e(instance)
        .toBeTruthy();
    });

    t.it('should dispatch `addOneAirline` action on init',
      t.async(() => {
        const fixture = TestBed.createComponent(AirlineDetailContainerComponent);
        const store$ = TestBed.get(Store);
        const state = getState<Airline>(AIRLINE);
        store$.setState(state);
        const spy = t.spyOn(store$, 'dispatch');

        fixture.detectChanges();

        const action = airlineActions.addOneAirline();

        t.e(spy)
          .toHaveBeenCalledWith(action);
        t.e(spy)
          .toHaveBeenCalledTimes(1);
      }));

    t.it('should dispatch `createOneAirline` action on save',
      t.async(() => {
        const fixture = TestBed.createComponent(AirlineDetailContainerComponent);
        const instance = fixture.componentInstance;
        const store$ = TestBed.get(Store);
        const state = getState<Airline>(AIRLINE);
        store$.setState(state);
        const spy = t.spyOn(store$, 'dispatch');

        fixture.detectChanges();

        const saveClick = flow(
          (cur: ComponentFixture<AirlineDetailContainerComponent>) => cur.debugElement.query(By.directive(AirlineDetailComponent)),
          cur => cur.componentInstance,
          cur => cur.saveClick
        )(fixture);
        const resource = {_id: EMPTY_UNIQUE_ID, ...MOCK_AIRLINE};
        saveClick.emit(MOCK_AIRLINE);

        const router = fixture.debugElement.injector.get(Router);
        const action = airlineActions.createOneAirline({resource, router, route: instance.baseRoute});

        t.e(spy)
          .toHaveBeenCalledWith(action);
        t.e(spy)
          .toHaveBeenCalledTimes(2);
      }));
  });

  t.describe('+air-universal/airline/airline-detail-container: AirlineDetailContainerComponent for renderFlag=`Update`', () => {
    t.be(() => testModuleConfig(RenderFlag.Update));

    t.it('should dispatch `getOneAirline` action on init',
      t.async(() => {
        const fixture = TestBed.createComponent(AirlineDetailContainerComponent);
        const state = getState<Airline>(AIRLINE, MOCK_AIRLINE);
        const store$ = TestBed.get(Store);
        store$.setState(state);
        const spy = t.spyOn(store$, 'dispatch');

        fixture.detectChanges();

        const action = airlineActions.getOneAirline(MOCK_AIRLINE._id);

        t.e(spy)
          .toHaveBeenCalledWith(action);
        t.e(spy)
          .toHaveBeenCalledTimes(1);
      }));

    t.it('should dispatch `updateOneAirline` action on save',
      t.async(() => {
        const fixture = TestBed.createComponent(AirlineDetailContainerComponent);
        const instance = fixture.componentInstance;
        const store$ = TestBed.get(Store);
        const state = getState<Airline>(AIRLINE);
        store$.setState(state);
        const spy = t.spyOn(store$, 'dispatch');

        fixture.detectChanges();

        const saveClick = flow(
          (cur: ComponentFixture<AirlineDetailContainerComponent>) => cur.debugElement.query(By.directive(AirlineDetailComponent)),
          cur => cur.componentInstance,
          cur => cur.saveClick
        )(fixture);
        saveClick.emit(MOCK_AIRLINE);

        const router = fixture.debugElement.injector.get(Router);
        const action = airlineActions.updateOneAirline({resource: MOCK_AIRLINE, router, route: instance.baseRoute});

        t.e(spy)
          .toHaveBeenCalledWith(action);
        t.e(spy)
          .toHaveBeenCalledTimes(2);
      }));

    t.it('should dispatch `updateOneAirline` action on save',
      t.async(() => {
        const fixture = TestBed.createComponent(AirlineDetailContainerComponent);
        const instance = fixture.componentInstance;
        const store$ = TestBed.get(Store);
        const state = getState<Airline>(AIRLINE);
        store$.setState(state);
        const spy = t.spyOn(store$, 'dispatch');

        fixture.detectChanges();

        const deleteClick = flow(
          (cur: ComponentFixture<AirlineDetailContainerComponent>) => cur.debugElement.query(By.directive(AirlineDetailComponent)),
          cur => cur.componentInstance,
          cur => cur.deleteClick
        )(fixture);
        deleteClick.emit(MOCK_AIRLINE._id);

        const router = fixture.debugElement.injector.get(Router);
        const action = airlineActions.deleteOneAirline({id: MOCK_AIRLINE._id, router, route: instance.baseRoute});

        t.e(spy)
          .toHaveBeenCalledWith(action);
        t.e(spy)
          .toHaveBeenCalledTimes(2);
      }));
  });
});
