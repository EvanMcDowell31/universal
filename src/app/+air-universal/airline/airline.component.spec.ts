// angular
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';

// libs
import { Store } from '@ngrx/store';
import { configureTestSuite } from 'ng-bullet';
import { cold } from 'jasmine-marbles';

// framework
import { MaterialModule } from '~/app/framework/material';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { RouterTestingModule } from '~/app/framework/router/testing';
import { getState, NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { t } from '~/app/framework/testing';
import { MOCK_AIRLINE } from '~/app/store/testing';

// shared
import { DataTableModule } from '~/app/shared/data-table';
import { SharedModule } from '~/app/shared';

// store
import { AIRLINE, Airline, airlineActions } from '~/app/store';

// module
import { AirlineComponent } from './airline.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      MaterialModule,
      CoreTestingModule,
      I18NTestingModule,
      NgrxTestingModule,
      SharedModule,
      DataTableModule,
      FlexModule
    ],
    declarations: [AirlineComponent]
  });
});

t.describe('ng-seed/universal', () => {
  t.describe('+air-universal/airline: AirlineComponent', () => {
    t.it('should build without a problem', () => {
      const fixture = TestBed.createComponent(AirlineComponent);
      const instance = fixture.componentInstance;

      fixture.detectChanges();

      t.e(instance)
        .toBeTruthy();
    });

    t.it('should dispatch `getAllAirlines` action on init', () => {
      const fixture = TestBed.createComponent(AirlineComponent);
      const store$ = fixture.debugElement.injector.get(Store);
      const spy = t.spyOn(store$, 'dispatch');

      fixture.detectChanges();

      const action = airlineActions.getAllAirlines();

      t.e(spy)
        .toHaveBeenCalledWith(action);
      t.e(spy)
        .toHaveBeenCalledTimes(1);
    });

    t.it('should `getAll` from AirlineSelectors on init', t.async(() => {
      const fixture = TestBed.createComponent(AirlineComponent);
      const store$ = TestBed.get(Store);
      const state = getState<Airline>(AIRLINE, MOCK_AIRLINE);
      store$.setState(state);

      fixture.detectChanges();

      const instance = fixture.componentInstance;
      fixture.detectChanges();

      const expected = cold('a', {a: [MOCK_AIRLINE]});

      (t.e(instance.airlines$) as any)
        .toBeObservable(expected);
    }));

    t.it('should navigate to `create` on refresh button click',
      t.inject([Router], (router: Router) => {
        const fixture = TestBed.createComponent(AirlineComponent);
        const instance = fixture.componentInstance;
        const spy = t.spyOn(router, 'navigate');

        fixture.detectChanges();

        const menu = fixture.debugElement.query(By.css('.qa-menu'));
        menu.triggerEventHandler('click', {});
        const createButton = fixture.debugElement.query(By.css('.qa-menu_item__create'));
        createButton.triggerEventHandler('click', {});

        t.e(spy)
          .toHaveBeenCalledWith([...instance.baseRoute, 'create']);
        t.e(spy)
          .toHaveBeenCalledTimes(1);
      }));

    t.it('should dispatch `getAllAirlines` action on refresh button click', () => {
      const fixture = TestBed.createComponent(AirlineComponent);
      const store$ = fixture.debugElement.injector.get(Store);
      const spy = t.spyOn(store$, 'dispatch');

      fixture.detectChanges();

      const refreshButton = fixture.debugElement.query(By.css('button.qa-toolbar__refresh'));
      refreshButton.triggerEventHandler('click', {});

      const action = airlineActions.getAllAirlines();

      t.e(spy)
        .toHaveBeenCalledWith(action);
      t.e(spy)
        .toHaveBeenCalledTimes(2);
    });
  });
});
