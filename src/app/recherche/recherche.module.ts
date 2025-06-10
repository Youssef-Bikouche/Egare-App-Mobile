import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecherchePage } from './recherche.page';
import { RecherchePageRoutingModule } from './recherche-routing.module';
import { SearchFormModule } from '../search-form/search-form.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [  
    IonicModule,
    CommonModule,
    FormsModule,
    RecherchePageRoutingModule,
    ReactiveFormsModule,
    SearchFormModule,
    TranslateModule.forChild(),
  ],
  declarations: [RecherchePage]
})
export class RecherchePageModule {}

  