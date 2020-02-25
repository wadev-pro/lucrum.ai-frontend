import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment-timezone';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { combineLatest, of, Subject } from 'rxjs';
import { catchError, map, takeUntil, tap, filter } from 'rxjs/operators';
import { MatStepper } from '@angular/material/stepper';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { CAMPAIGN, MESSAGE_TEMPLATE_GROUP } from 'app/core/errors';
import { getReadableFileSizeString } from 'app/shared/helpers/utils';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { CampaignDetail, ComposeModel, UploadResponseModel } from 'app/shared/models/campaign.model';
import { DidPool } from 'app/shared/models/did-pool.model';
import { DomainPool } from 'app/shared/models/domain-pool.models';
import {
  AllMessageTemplateItem,
  MessageTemplateGroup,
} from 'app/shared/models/message-template-group.model';
import { CampaignService } from 'app/shared/services/apis/campaign.service';
import { CarrierBlackListService } from 'app/shared/services/apis/carrier-black-list.service';
import { DomainPoolService } from 'app/shared/services/apis/domain-pool.service';
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
import { CampaignClonePreviewModalComponent } from './preview-modal/preview-modal.component';

@Component({
  selector: 'app-campaign-clone',
  templateUrl: './clone.component.html',
  styleUrls: ['./clone.style.scss'],
  animations: egretAnimations,
})
export class CampaignCloneComponent implements OnInit, OnDestroy {
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('stepper') stepper: MatStepper;

  private onDestroy$ = new Subject<void>();

  public uploadFormGroup: FormGroup;
  public detailFormGroup: FormGroup;
  public campaign_id: string;
  public templateGroupFilterCtrl: FormControl = new FormControl();
  public templateGroups: Array<MessageTemplateGroup>;
  public filteredTemplateGroups: Array<MessageTemplateGroup>;
  public didPoolFilterCtrl: FormControl = new FormControl();
  public didPools: Array<DidPool>;
  public filteredDidPools: Array<DidPool>;
  public selectedCarrierBlackList: Array<string>;
  public domainPools: Array<DomainPool> = [];
  public processing: boolean;
  public isOld: boolean;

  public fileSelected: any;
  public uploadResult: UploadResponseModel;
  public useSameFile = false;

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
  public scheduleStartDate: any;
  public campaignDetail: CampaignDetail;

  getReadableFileSizeString = getReadableFileSizeString;

  constructor(
    private formBuilder$: FormBuilder,
    private loader$: AppLoaderService,
    private service$: CampaignService,
    private tempalteGroupService$: MessageTemplateGroupService,
    private store$: Store<AppState>,
    private dialog: MatDialog,
    private formControlService$: FormControlService,
    private route$: ActivatedRoute,
    private carrierBlackListService$: CarrierBlackListService,
    private domainPoolService$: DomainPoolService,
    private authenticationService: AuthService,
    private router$: Router,
    private changeDetectorRefs$: ChangeDetectorRef,
    private snack$: MatSnackBar
  ) {}

  ngOnInit() {
    this.isOld = false;
    this.processing = true;
    this.scheduleStartDate = new Date();
    this.selectedCarrierBlackList = [];

    this.uploadFormGroup = this.formBuilder$.group({
      useSameFile: [false],
      uploadfile: [null],
      ready: [null, Validators.required],
    });

    this.detailFormGroup = this.formBuilder$.group({
      templateGroup: [null, Validators.required],
      didPool: [null, Validators.required],
      campaignName: ['', Validators.required],
      callImpressionUrl: ['', Validators.required],
      destinationUrl: ['', Validators.required],
      seedMessageEvery: [null, Validators.required],
      deliveryAcrossHours: [null, Validators.required],
      deliveryAcrossMinutes: [null, Validators.required],
      domains: ['', Validators.required],
      disableCarrierCheck: [false],
      autoStart: [false, Validators.required],
      batchSize: [null, Validators.required],
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
      scheduleTime: [''],
    });

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

    combineLatest(
      this.route$.paramMap,
      this.store$.select(templateGroupDataSelector),
      this.store$.select(didPoolDataSelector)
    )
      .pipe(
        filter(([params, templateGroup, didPool]) => !!(templateGroup.length && didPool.length)),
        takeUntil(this.onDestroy$))
      .subscribe(([params, templateGroup, didPool]) => {
        this.campaign_id = params.get('campaign_id');

        this.templateGroups = templateGroup;
        this.filteredTemplateGroups = this.templateGroups.slice(0);

        this.didPools = didPool;
        this.filteredDidPools = this.didPools.slice(0);

        this.initData();
      });

    // listen for search field value changes
    this.templateGroupFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.filterTemplateGroups();
      });

    // listen for search field value changes
    this.didPoolFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.filterDidPools();
      });
  }

  initData() {
    this.carrierBlackListService$
      .getByCampaignId(this.campaign_id)
      .pipe(
        catchError(() => {
          return of(CAMPAIGN.ADD_ERROR);
        })
      )
      .subscribe(result => {
        this.selectedCarrierBlackList = result;
      });

    this.domainPoolService$
      .getList(this.campaign_id)
      .pipe(
        catchError(() => {
          return of(CAMPAIGN.ADD_ERROR);
        })
      )
      .subscribe(result => {
        this.domainPools = result.domains;
        const domains = this.domainPools.map(item => item.domain);
        this.detailFormGroup.patchValue({
          domains: domains.join('\r\n'),
        });
      });

    this.getCampaignDetail();
  }

  getCampaignDetail() {
    this.service$
      .getDetail(this.campaign_id)
      .pipe(
        catchError(() => {
          this.isOld = true;
          this.processing = false;
          this.changeDetectorRefs$.detectChanges();
          return of(CAMPAIGN.GET_ERROR);
        })
      )
      .subscribe((result: CampaignDetail) => {
        this.campaignDetail = result;
        this.initFormGroup();
      });
  }

  initFormGroup() {
    const didPool = this.didPools.find(
        item => item.id === this.campaignDetail.didPoolId
      ),
      templateGroup = this.templateGroups.find(
        item => item.groupId === this.campaignDetail.messageTemplateGroupId
      ),
      deliveryTime = moment(this.campaignDetail.deliveryInterval, 'HH:mm:ss'),
      deliveryHour = deliveryTime ? deliveryTime.get('hour') : '',
      deliveryMinute = deliveryTime ? deliveryTime.get('minute') : '';
    if (this.campaignDetail.scheduleTime) {
      const scheduleTime = moment(this.campaignDetail.scheduleTime);
      this.scheduleDate = scheduleTime;
      this.scheduleTime = scheduleTime.format('HH:mm a');
    }

    this.detailFormGroup.patchValue({
      templateGroup: templateGroup,
      didPool: didPool,
      campaignName: this.campaignDetail['name'] + '_clone',
      callImpressionUrl: this.campaignDetail['callImpressionUrl'],
      destinationUrl: this.campaignDetail['destinationUrl'],
      seedMessageEvery: this.campaignDetail['injectTestMessageEvery'],
      deliveryAcrossHours: deliveryHour,
      deliveryAcrossMinutes: deliveryMinute,
      disableCarrierCheck: this.campaignDetail['disableCarrierCheck'],
      autoStart: this.campaignDetail['autoStart'],
      batchSize: this.campaignDetail['initialProcessingBatchSize'],
      vertical: this.campaignDetail['vertical'],
      fileTags: this.campaignDetail['fileTags']
        ? this.campaignDetail['fileTags']['Owner']
        : '',
      conversationId: this.campaignDetail['conversationId'],
      maxNumberOfSendMessagesForNoneClicks: this.campaignDetail[
        'maxNumberOfSendMessagesForNoneClickers'
      ],
      qualityCheckConcurrencyLimit: this.campaignDetail[
        'qualityCheckConcurrencyLimit'
      ],
      campaignRunnerConcurrencyLimit: this.campaignDetail[
        'campaignRunnerConcurrencyLimit'
      ],
      carrierBlacklistAttt: this.getCarrierSelected('AT&T'),
      carrierBlacklistSprint: this.getCarrierSelected('SPRINT'),
      carrierBlacklistTmobile: this.getCarrierSelected('T-Mobile'),
      carrierBlacklistVerizon: this.getCarrierSelected('Verizon'),
      scheduleTime: this.campaignDetail['scheduleTime'],
    });
    this.processing = false;
    this.changeDetectorRefs$.detectChanges();
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
      this.uploadFormGroup.patchValue({ ready: null });
      this.loader$.open();
      this.service$
        .uploadCampaignFile(this.fileSelected)
        .pipe(
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
        .subscribe((result: UploadResponseModel) => {
          this.uploadResult = result;
          this.uploadFormGroup.patchValue({ ready: true });
          this.loader$.close();
        });
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
              new actions.AddError({
                error: MESSAGE_TEMPLATE_GROUP.LIST_ERROR,
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
      CampaignClonePreviewModalComponent,
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

  onSubmit() {
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
        fileName: this.useSameFile ? this.campaignDetail.fileUrl : this.uploadResult.fileName,
        messageTemplateGroupId: this.detailFormGroup.value.templateGroup
          .groupId,
        didPoolId: this.detailFormGroup.value.didPool.id,
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
          map(result => {
            this.loader$.close();
            this.goToList();
          }),
          catchError(() => {
            this.loader$.close();
            this.store$.dispatch(
              new actions.AddError({
                error: CAMPAIGN.ADD_ERROR,
              })
            );
            return of(CAMPAIGN.ADD_ERROR);
          })
        )
        .subscribe();
    }
  }

  getCarrierSelected(type: string) {
    return this.selectedCarrierBlackList.includes(type);
  }

  goToList() {
    this.store$.dispatch(new actions.ClearDetail());
    this.router$.navigateByUrl('/campaigns');
  }

  onUseSameFileChange($evt) {
    this.useSameFile = $evt.checked;
    this.uploadFormGroup.get('ready').setValue($evt.checked || !!this.fileSelected || null);
  }
}
