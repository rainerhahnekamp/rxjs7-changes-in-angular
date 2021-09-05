import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer, sharedFeatureKey } from './+state/shared.reducer';

@NgModule({
  imports: [StoreModule.forFeature(sharedFeatureKey, reducer)],
})
export class SharedModule {}
