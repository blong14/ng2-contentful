import { RouterModule, Routes } from '@angular/router';
import { ContentTypesComponent } from './src/components/content-types/content-types.component';
import { EntriesComponent } from './src/components/entries/entries.component';
import { AssetsComponent } from './src/components/assets/assets.component';
import { ModuleWithProviders } from '@angular/core';

export const routes:Routes = [
  {path: '', component: AssetsComponent},
  {path: 'entries/:contentType', component: EntriesComponent},
  {path: 'content-types', component: ContentTypesComponent},
  {path: '**', redirectTo: ''}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: false});
