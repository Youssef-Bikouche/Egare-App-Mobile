import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
// import { PhoneComponent } from './phone/phone.component';

const routes: Routes = [
  {
    path: 'identification',
    loadChildren: () => import('./identification/identification.module').then(m => m.IdentificationModule)
  },{
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'rechercher',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'ticket',
    loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)
  },{
    path: '',
    loadChildren:() =>import('./tabs/tabs.module').then(m=>m.TabsPageModule)
  }
  ,{
    path: 'searchForm',
    loadChildren:() =>import('./search-form/search-form.module').then(m=>m.SearchFormModule)
  },{
    path: 'PaymentDetails',
    loadChildren:() =>import('./detail-payment/detail-payment.module').then(m=>m.DetailPaymentModule)
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'recherche',
        loadChildren: () => import('./recherche/recherche.module').then(m => m.RecherchePageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('./tab4/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/recherche',
        pathMatch: 'full'
      }
    ]
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
