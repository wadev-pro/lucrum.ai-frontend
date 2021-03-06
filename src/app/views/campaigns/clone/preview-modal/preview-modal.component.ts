import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AllMessageTemplateItem } from 'app/shared/models/message-template-group.model';

@Component({
  selector: 'app-campaign-clone-preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.scss'],
})
export class CampaignClonePreviewModalComponent implements OnInit {
  public allMessageTemplates: Array<AllMessageTemplateItem>;
  public viewType: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CampaignClonePreviewModalComponent>
  ) {}
  ngOnInit() {
    this.viewType = this.data.type;
    this.allMessageTemplates = this.data.payload.data;
  }
}
