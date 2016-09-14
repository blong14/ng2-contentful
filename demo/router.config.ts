import { RouterModule, Routes } from '@angular/router';
import { ContentTypesComponent } from './src/components/content-types/content-types.component';
import { EntriesComponent } from './src/components/entries/entries.component';
import { CredentialsComponent } from './src/components/credentials/credentials.component';
import { AssetsComponent } from './src/components/assets/assets.component';
import { CanSeeContentfulData } from './src/components/app.tools';
import { ModuleWithProviders } from '@angular/core';

export const routes:Routes = [
  {path: '', component: CredentialsComponent},
  {path: 'assets', component: AssetsComponent, canActivate: [CanSeeContentfulData]},
  {path: 'entries/:contentType', component: EntriesComponent, canActivate: [CanSeeContentfulData]},
  {path: 'content-types', component: ContentTypesComponent, canActivate: [CanSeeContentfulData]},
  {path: '**', redirectTo: ''}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: false});
