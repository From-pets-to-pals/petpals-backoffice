import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isTauriGuard: CanActivateFn = () => {
  const router: Router = inject(Router);

  const hasRole: boolean = window.__TAURI__ !== undefined;

  return hasRole || router.navigate(['create-caregiver']);
};