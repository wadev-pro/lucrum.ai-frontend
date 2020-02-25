import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment-timezone';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { of, Subject } from 'rxjs';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { CAMPAIGN, MESSAGE_TEMPLATE_GROUP } from 'app/core/errors';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { getReadableFileSizeString } from 'app/shared/helpers/utils';
import {
  ComposeModel,
  UploadResponseModel,
} from 'app/shared/models/campaign.model';
import { DidPool } from 'app/shared/models/did-pool.model';
import {
  AllMessageTemplateItem,
  MessageTemplateGroup,
} from 'app/shared/models/message-template-group.model';
import { CampaignService } from 'app/shared/services/apis/campaign.service';
import { MessageTemplateGroupService } from 'app/shared/services/apis/message-template-group.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AuthService } from 'app/shared/services/auth/auth.service';
import { FormControlService } from 'app/shared/services/form-control.service';
import { AppState } from 'app/store';
import * as actions from 'app/store/campaign/campaign.actions';
import { GetList as didPoolGetList } from 'app/store/did-pool/did-pool.actions';
import {
  dataSelector as didPoolDataSelector,
  didFetchSelector as didPoolDidFetchSelector,
} from 'app/store/did-pool/did-pool.selectors';
import { AddError } from 'app/store/error/error.actions';
import { GetList as templateGroupGetList } from 'app/store/message-template-group/message-template-group.actions';
import {
  dataSelector as templateGroupDataSelector,
  didFetchSelector as templateGroupDidFetchSelector,
} from 'app/store/message-template-group/message-template-group.selectors';
import { ComposerPreviewModalComponent } from './preview-modal/preview-modal.component';

@Component({
  selector: 'app-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.scss'],
  animations: egretAnimations,
})
export class ComposerComponent implements OnInit, OnDestroy {
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('stepper') stepper: MatStepper;

  private onDestroy$ = new Subject<void>();

  public isLinear = true;
  public uploadFormGroup: FormGroup;
  public detailFormGroup: FormGroup;

  public templateGroupFilterCtrl: FormControl = new FormControl();
  public replyBackGroupFilterCtrl: FormControl = new FormControl();
  public templateGroups: Array<MessageTemplateGroup>;
  public filteredTemplateGroups: Array<MessageTemplateGroup>;
  public replyBackTemplateGroups: Array<MessageTemplateGroup>;

  public didPoolFilterCtrl: FormControl = new FormControl();
  public didPools: Array<DidPool>;
  public filteredDidPools: Array<DidPool>;

  public fileSelected: any;
  public uploadResult: UploadResponseModel;

  public allMessageTemplates: Array<AllMessageTemplateItem>;
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff',
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff',
    },
  };

  public scheduleTime: any;
  public scheduleDate: any;
  public isEditable: boolean;
  public scheduleStartDate: any;

  getReadableFileSizeString = getReadableFileSizeString;
  constructor(
    private formBuilder$: FormBuilder,
    private loader$: AppLoaderService,
    private service$: CampaignService,
    private tempalteGroupService$: MessageTemplateGroupService,
    private store$: Store<AppState>,
    private dialog: MatDialog,
    private formControlService$: FormControlService,
    private authenticationService: AuthService,
    private snack$: MatSnackBar,
    private router$: Router
  ) {
    this.isEditable = true;
  }

  ngOnInit() {
    this.scheduleStartDate = new Date();
    this.uploadFormGroup = this.formBuilder$.group({
      uploadfile: [null],
      isUploaded: [null, Validators.required],
    });
    this.detailFormGroup = this.formBuilder$.group({
      templateGroup: [null, Validators.required],
      replyBackMessageTemplateGroupId: [null],
      didPool: [null, Validators.required],
      replyBackDidPoolId: [null],
      campaignName: ['', Validators.required],
      callImpressionUrl: ['', Validators.required],
      destinationUrl: ['', Validators.required],
      seedMessageEvery: [null, Validators.required],
      deliveryAcrossHours: [0, Validators.required],
      deliveryAcrossMinutes: [0, Validators.required],
      domains: ['', Validators.required],
      disableCarrierCheck: [false],
      autoStart: [false, Validators.required],
      batchSize: [0, Validators.required],
      vertical: ['', Validators.required],
      fileTags: ['', Validators.required],
      conversationId: [''],
      maxNumberOfSendMessagesForNoneClicks: [null],
      qualityCheckConcurrencyLimit: [null],
      campaignRunnerConcurrencyLimit: [null],
      carrierBlacklistAttt: [false, Validators.required],
      carrierBlacklistSprint: [false, Validators.required],
      carrierBlacklistTmobile: [false, Validators.required],
      carrierBlacklistVerizon: [false, Validators.required],
      isReplyBackCampaign: [false],
    });

    this.resetData();

    this.store$
      .select(templateGroupDidFetchSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(
          didFetch =>
            !didFetch && this.store$.dispatch(new templateGroupGetList())
        )
      )
      .subscribe();

    this.store$
      .select(didPoolDidFetchSelector)
      .pipe(
        takeUntil(this.onDestroy$),
        tap(didFetch => !didFetch && this.store$.dispatch(new didPoolGetList()))
      )
      .subscribe();

    this.store$
      .select(templateGroupDataSelector)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => {
        this.templateGroups = data;
        this.filteredTemplateGroups = this.templateGroups.slice(0);
        if (this.filteredTemplateGroups.length) {
          this.filteredTemplateGroups[0].isReplyBackGroup = true;
        }
        this.replyBackTemplateGroups = this.filteredTemplateGroups.filter( groupItem => groupItem.isReplyBackGroup);
      });

    this.store$
      .select(didPoolDataSelector)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => {
        this.didPools = data;
        this.filteredDidPools = this.didPools.slice(0);
      });

    // listen for search field value changes
    this.templateGroupFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.filterTemplateGroups();
      });
    // listen for search field value changes
    this.replyBackGroupFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.filterReplyBackTemplateGroups();
      });

    // listen for search field value changes
    this.didPoolFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.filterDidPools();
      });
  }

  filterTemplateGroups() {
    if (!this.templateGroups) {
      return;
    }
    // get the search keyword
    let search = this.templateGroupFilterCtrl.value;
    if (!search) {
      this.filteredTemplateGroups = this.templateGroups.slice(0);
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredTemplateGroups = this.templateGroups.filter(
      item => item.name.toLowerCase().indexOf(search) > -1
    );
  }
  filterReplyBackTemplateGroups() {
    if (!this.templateGroups) {
      return;
    }
    // get the search keyword
    let search = this.replyBackGroupFilterCtrl.value;
    if (!search) {
      this.replyBackTemplateGroups = this.templateGroups.slice(0).filter( groupItem => groupItem.isReplyBackGroup);
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.replyBackTemplateGroups = this.templateGroups.filter(
      item => item.name.toLowerCase().indexOf(search) > -1 && item.isReplyBackGroup
    );
  }

  filterDidPools() {
    if (!this.didPools) {
      return;
    }
    // get the search keyword
    let search = this.didPoolFilterCtrl.value;
    if (!search) {
      this.filteredDidPools = this.didPools.slice(0);
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredDidPools = this.didPools.filter(
      item => item.name.toLowerCase().indexOf(search) > -1
    );
  }

  onFileSelect() {
    this.inputFile.nativeElement.click();
  }

  fileChangeEvent($e) {
    if ($e.srcElement && $e.srcElement.files && $e.srcElement.files.length) {
      this.fileSelected = $e.srcElement.files[0];
      this.uploadFormGroup.patchValue({ isUploaded: null });
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  isTemplateButtonDisabled() {
    return !this.detailFormGroup.value.templateGroup;
  }

  viewTemplate(type) {
    if (!this.allMessageTemplates) {
      this.loader$.open();
      const templateGroupId = this.detailFormGroup.value.templateGroup.groupId;
      this.tempalteGroupService$
        .getAllTemplatePreviewsById(templateGroupId)
        .pipe(
          map((result: Array<AllMessageTemplateItem>) => {
            this.allMessageTemplates = result;
            this.loader$.close();
            this.openPreviewModal(type);
          }),
          catchError(() => {
            this.loader$.close();
            this.store$.dispatch(
              new AddError({
                type: CAMPAIGN.TYPE,
                message: MESSAGE_TEMPLATE_GROUP.LIST_ERROR,
              })
            );
            return of(MESSAGE_TEMPLATE_GROUP.LIST_ERROR);
          })
        )
        .subscribe();
    } else {
      this.openPreviewModal(type);
    }
  }

  openPreviewModal(type) {
    const title = type === 'template' ? 'View Templates' : 'Preview Crafted';
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      ComposerPreviewModalComponent,
      {
        width: '720px',
        disableClose: false,
        data: {
          title: title,
          payload: { data: this.allMessageTemplates },
          type: type,
        },
      }
    );
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        // If user press cancel
        return;
      }
    });
  }

  onTemplateGroupChanged() {
    this.allMessageTemplates = null;
  }

  uploadFile() {
    if (!this.fileSelected) {
      this.snack$.open('Please select file to upload', 'OK', {
        duration: 4000,
      });
      return false;
    }
    if (!this.uploadFormGroup.value.isUploaded && this.fileSelected) {
      this.loader$.open();
      this.service$
        .uploadCampaignFile(this.fileSelected)
        .pipe(
          map((result: UploadResponseModel) => {
            this.uploadResult = result;
            this.uploadFormGroup.patchValue({ isUploaded: true });
            this.stepper.next();
            this.loader$.close();
          }),
          catchError(() => {
            this.loader$.close();
            this.store$.dispatch(
              new AddError({
                type: CAMPAIGN.TYPE,
                message: CAMPAIGN.FILE_UPLOAD_ERROR,
              })
            );
            return of(CAMPAIGN.FILE_UPLOAD_ERROR);
          })
        )
        .subscribe();
    } else {
      this.stepper.next();
    }
  }

  onSubmitDetail() {
    const scheduleDate = this.scheduleDate,
      scheduleTime = moment(this.scheduleTime, 'HH:mm a');

    if (!this.detailFormGroup.valid) {
      this.formControlService$.validateAllFormFields(this.detailFormGroup);
    } else {
      const carrierBlacklist = [];
      if (this.detailFormGroup.value.carrierBlacklistAttt) {
        carrierBlacklist.push('AT&T');
      }
      if (this.detailFormGroup.value.carrierBlacklistSprint) {
        carrierBlacklist.push('SPRINT');
      }
      if (this.detailFormGroup.value.carrierBlacklistTmobile) {
        carrierBlacklist.push('T-Mobile');
      }
      if (this.detailFormGroup.value.carrierBlacklistVerizon) {
        carrierBlacklist.push('Verizon');
      }
      const payload: ComposeModel = {
        userId: this.authenticationService.getApiIdentification(),
        fileName: this.uploadResult.fileName,
        messageTemplateGroupId: this.detailFormGroup.value.templateGroup
          .groupId,
        didPoolId: this.detailFormGroup.value.didPool.id,
        replyBackDidPoolId: this.detailFormGroup.value.replyBackDidPoolId ? this.detailFormGroup.value.replyBackDidPoolId.id : '',
        campaignName: this.detailFormGroup.value.campaignName,
        callImpressionUrl: this.detailFormGroup.value.callImpressionUrl,
        destinationUrl: this.detailFormGroup.value.destinationUrl,
        seedMessageEvery: this.detailFormGroup.value.seedMessageEvery,
        deliveryAcrossHours: this.detailFormGroup.value.deliveryAcrossHours,
        deliveryAcrossMinutes: this.detailFormGroup.value.deliveryAcrossMinutes,
        routingPlanId: '',
        domains: this.detailFormGroup.value.domains,
        disableCarrierCheck: this.detailFormGroup.value.disableCarrierCheck,
        autoStart: this.detailFormGroup.value.autoStart,
        batchSize: this.detailFormGroup.value.batchSize,
        vertical: this.detailFormGroup.value.vertical,
        fileTags: {
          Owner: this.detailFormGroup.value.fileTags,
        },
        conversationId: this.detailFormGroup.value.conversationId,
        carrierBlacklist: carrierBlacklist,
        maxNumberOfSendMessagesForNoneClickers: this.detailFormGroup.value
          .maxNumberOfSendMessagesForNoneClicks,
        qualityCheckConcurrencyLimit: this.detailFormGroup.value
          .qualityCheckConcurrencyLimit,
        campaignRunnerConcurrencyLimit: this.detailFormGroup.value
          .campaignRunnerConcurrencyLimit,
        isReplyBackCampaign: this.detailFormGroup.value.isReplyBackCampaign,
        replyBackMessageTemplateGroupId: this.detailFormGroup.value.replyBackMessageTemplateGroupId ? this.detailFormGroup.value.replyBackMessageTemplateGroupId.groupId : ''
      };

      if (scheduleDate) {
        scheduleDate.set({
          hour: scheduleTime.get('hour'),
          minute: scheduleTime.get('minute'),
          second: 0,
        });
        const scheduleDateTime = moment(scheduleDate).format(
          'YYYY-MM-DD HH:mm:ssZ'
        );
        payload['scheduleTime'] = scheduleDateTime;
      }
      this.loader$.open();
      this.service$
        .composeCampaign(payload)
        .pipe(
          map(() => {
            this.loader$.close();
            this.store$.dispatch(new actions.ClearDetail());
            this.stepper.next();
            this.isEditable = false;
          }),
          catchError(() => {
            this.loader$.close();
            this.store$.dispatch(
              new AddError({
                type: CAMPAIGN.TYPE,
                message: CAMPAIGN.ADD_ERROR,
              })
            );
            return of(CAMPAIGN.ADD_ERROR);
          })
        )
        .subscribe();
    }
  }

  reset() {
    this.stepper.reset();
    this.resetData();
  }

  resetData() {
    this.isEditable = true;
    this.scheduleTime = null;
    this.scheduleDate = null;
    this.fileSelected = null;
    this.uploadResult = null;

    this.uploadFormGroup.reset();
    this.detailFormGroup.patchValue({
      templateGroup: null,
      replyBackMessageTemplateGroupId: null,
      didPool: null,
      replyBackDidPoolId: null,
      campaignName: '',
      callImpressionUrl: '',
      destinationUrl: '',
      seedMessageEvery: null,
      deliveryAcrossHours: 0,
      deliveryAcrossMinutes: 0,
      domains: '',
      disableCarrierCheck: false,
      autoStart: false,
      batchSize: 0,
      vertical: '',
      fileTags: '',
      conversationId: '',
      maxNumberOfSendMessagesForNoneClicks: null,
      qualityCheckConcurrencyLimit: null,
      campaignRunnerConcurrencyLimit: null,
      carrierBlacklistAttt: false,
      carrierBlacklistSprint: false,
      carrierBlacklistTmobile: false,
      carrierBlacklistVerizon: false,
      isReplyBackCampaign: false
    });
  }

  goToList() {
    this.store$.dispatch(new actions.ClearDetail());
    this.router$.navigateByUrl('/campaigns');
  }

  onReplyBackCampaignChange(event) {
    if(!event.checked) {
      this.detailFormGroup.get('replyBackMessageTemplateGroupId').setValue(null);
      this.detailFormGroup.get('replyBackDidPoolId').setValue(null);
    }
  }
}
