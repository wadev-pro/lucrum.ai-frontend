import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullWidthCardTabComponent } from './full-width-card-tab/full-width-card-tab.component';
import { FullWidthCardComponent } from './full-width-card/full-width-card.component';
import { FullWidthPlainComponent } from './full-width-plain/full-width-plain.component';
import { LeftSidebarCardComponent } from './left-sidebar-card/left-sidebar-card.component';
import { LeftSidebarPlainComponent } from './left-sidebar-plain/left-sidebar-plain.component';
import { RightSidebarCardComponent } from './right-sidebar-card/right-sidebar-card.component';

const routes: Routes = [
  {
    path: 'full-width-card',
    component: FullWidthCardComponent,
  },
  {
    path: 'full-width-card-tab',
    component: FullWidthCardTabComponent,
  },
  {
    path: 'left-sidebar-card',
    component: LeftSidebarCardComponent,
  },
  {
    path: 'right-sidebar-card',
    component: RightSidebarCardComponent,
  },

  {
    path: 'full-width-plain',
    component: FullWidthPlainComponent,
  },
  {
    path: 'left-sidebar-plain',
    component: LeftSidebarPlainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageLayoutsRoutingModule {}
