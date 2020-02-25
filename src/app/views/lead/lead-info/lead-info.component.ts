import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import * as _ from 'underscore';

import { egretAnimations } from 'app/shared/animations/egret-animations';
import { getBoolColor, getBoolLabel } from 'app/shared/helpers/utils';
import { initialLead, Lead } from 'app/shared/models/lead.model';
import { LeadService } from 'app/shared/services/apis/lead.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-lead-leadinfo',
  templateUrl: './lead-info.component.html',
  styleUrls: ['./lead-info.style.css'],
  animations: egretAnimations,
})
export class LeadInfoComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();
  getBoolColor = getBoolColor;
  getBoolLabel = getBoolLabel;
  public numberLookupForm: FormGroup;
  public lead: Lead;

  constructor(
    private changeDetectorRefs$: ChangeDetectorRef,
    private fb: FormBuilder,
    private service$: LeadService,
    private loader$: AppLoaderService
  ) {
    this.numberLookupForm = this.fb.group({
      number: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.lead = null;
  }

  submit() {
    const phoneNumber = this.numberLookupForm.value['number'];

    this.loader$.open();
    this.service$
      .getLeadInfo(phoneNumber)
      .pipe(
        takeUntil(this.onDestroy$),
        map(result => result),
        catchError(err => {
          return of(err);
        })
      )
      .subscribe(result => {
        if (result.error) {
          this.lead = initialLead;
        } else {
          this.lead = result;
        }
        this.changeDetectorRefs$.detectChanges();
        this.loader$.close();
      });
  }
}
