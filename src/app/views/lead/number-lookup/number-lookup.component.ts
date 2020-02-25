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
import { initialNumberInfo, NumberInfo } from 'app/shared/models/lead.model';
import { LeadService } from 'app/shared/services/apis/lead.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AppState } from 'app/store/';

@Component({
  selector: 'app-lead-numberlookup',
  templateUrl: './number-lookup.component.html',
  styleUrls: ['./number-lookup.style.css'],
  animations: egretAnimations,
})
export class LeadNumberLookupComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();
  getBoolColor = getBoolColor;
  getBoolLabel = getBoolLabel;
  public numberLookupForm: FormGroup;
  public numberInfo: NumberInfo;

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
    this.numberInfo = null;
  }

  submit() {
    const phoneNumber = this.numberLookupForm.value['number'];

    this.loader$.open();
    this.service$
      .numberLookup(phoneNumber)
      .pipe(
        takeUntil(this.onDestroy$),
        map(result => result),
        catchError(err => {
          return of(err);
        })
      )
      .subscribe(result => {
        if (result.error) {
          this.numberInfo = initialNumberInfo;
        } else {
          this.numberInfo = result;
        }
        this.changeDetectorRefs$.detectChanges();
        this.loader$.close();
      });
  }
}
