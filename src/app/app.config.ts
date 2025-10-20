import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './commom/helpers/http.interceptor';

export const appConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    AuthInterceptor,
  ],
};
