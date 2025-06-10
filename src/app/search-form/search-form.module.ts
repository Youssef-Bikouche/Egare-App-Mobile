import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchFormRoutingModuleModule } from './search-form-routing.module';
import { SearchFormComponent } from './search-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SearchFormComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchFormRoutingModuleModule,
    TranslateModule.forChild()
  ],
  exports: [
    SearchFormComponent // Export the SearchFormComponent, not the module
  ]
})
export class SearchFormModule { }
