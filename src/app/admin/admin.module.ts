import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {OnlyAdminUsersGuard} from './admin-user-guard';
import { LevelService } from '../level.service';
import { SharedModule } from '../shared/shared.module';
import { BoardPreviewDialogComponent } from './boardPreviewDialog/board-preview-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    BoardPreviewDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  entryComponents: [
    BoardPreviewDialogComponent
  ],
  providers: [
    OnlyAdminUsersGuard,
    LevelService
  ]})
export class AdminModule {}
