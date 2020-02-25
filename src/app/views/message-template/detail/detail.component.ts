import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { MessageTemplate } from 'app/shared/models/message-template.model';
import { MessageTemplateService } from 'app/shared/services/apis/message-template.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MessageTemplatePreviewComponent } from '../preview-modal/preview-modal.component';

@Component({
  selector: 'app-message-template-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.style.scss'],
  animations: egretAnimations,
})
export class MessageTemplateDetailComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  public templateId: string;
  public isReady: boolean;
  public messageTemplate: MessageTemplate;

  constructor(
    private service$: MessageTemplateService,
    private route$: ActivatedRoute,
    private loader$: AppLoaderService,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.isReady = false;
    this.route$.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      this.templateId = params.get('id');
      this.initData();
    });
  }

  initData() {
    setTimeout(() => {
      this.loader$.open();
    }, 10);
    this.service$
      .getById(this.templateId)
      .pipe(
        takeUntil(this.onDestroy$),
        map(result => result),
        catchError(err => {
          return of(err);
        })
      )
      .subscribe(result => {
        this.messageTemplate = result;
        this.isReady = true;
        this.loader$.close();
        this.changeDetectorRefs.detectChanges();
      });
  }

  previewTemplate() {
    this.loader$.open();
    this.service$
      .previewRawContent(encodeURIComponent(this.messageTemplate.template))
      .pipe(
        takeUntil(this.onDestroy$),
        map(result => result),
        catchError(err => {
          return of(err);
        })
      )
      .subscribe(result => {
        this.loader$.close();
        this.openPreviewModal(result);
      });
  }

  openPreviewModal(message: string) {
    const title = 'Preview Message Template';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      MessageTemplatePreviewComponent,
      {
        width: '720px',
        disableClose: false,
        data: { title: title, payload: message },
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user press cancel
        return;
      }
    });
  }
}
