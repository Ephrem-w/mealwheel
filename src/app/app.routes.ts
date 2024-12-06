import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./portals/portal.module').then((m) => m.PortalModule),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./portals/user-portal/user-portal.module').then(
        (m) => m.UserPortalModule
      ),
  },
];
