// angular
import { ElementRef, ModuleWithProviders, NgModule, PLATFORM_ID } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// libs
import { ConfigService } from '@ngx-config/core';
import { CacheService } from '@ngx-cache/core';
import { MetaService } from '@ngx-meta/core';

// framework
import { ANALYTICS_PROVIDERS } from '~/app/framework/analytics';

// module
import { ConsoleService, LogService, WindowService } from '../index';

// mocks
import { MockCacheService } from './mocks/cache-service.mock';
import { MockConfigService } from './mocks/config-service.mock';
import { MockElementRef } from './mocks/element-ref.mock';
import { MockMetaService } from './mocks/meta-service.mock';
import { MockWindow } from './mocks/window.mock';

@NgModule({
  imports: [NoopAnimationsModule],
  providers: [
    {
      provide: ElementRef,
      useFactory: () => new MockElementRef()
    },
    {
      provide: WindowService,
      useClass: MockWindow
    },
    {
      provide: ConsoleService,
      useValue: console
    },
    LogService,
    {
      provide: ConfigService,
      useClass: MockConfigService
    },
    {
      provide: CacheService,
      useClass: MockCacheService
    },
    {
      provide: MetaService,
      useClass: MockMetaService
    },
    ANALYTICS_PROVIDERS
  ]
})
export class CoreTestingModule {
  static withOptions(options?: any): ModuleWithProviders {
    const platformProvider = options && options.platformId
      ? [
        {
          provide: PLATFORM_ID,
          useValue: options.platformId
        }
      ]
      : [];

    return {
      ngModule: CoreTestingModule,
      providers: [
        platformProvider,
        {
          provide: WindowService,
          useClass: (options && options.window) || MockWindow
        },
        {
          provide: ConfigService,
          useClass: (options && options.config) || MockConfigService
        },
        {
          provide: MetaService,
          useClass: (options && options.meta) || MockMetaService
        }
      ]
    };
  }
}
