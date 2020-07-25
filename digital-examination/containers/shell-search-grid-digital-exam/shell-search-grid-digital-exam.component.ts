import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as subscribe from '../../state/selectors/digital-examination-selector'
import * as digitalExamActions from '../../state/actions/digital-examination-action'
import { GridData, PageDetail, File } from '../../models/digital-examination.model';
import { passViewDigitalUploadedData, viewPasswordNonMusicLoad, passUploadGridData } from '../../state/actions/digital-examination-action';
import { ActivatedRoute, Router } from '@angular/router';
import { pageHeading } from '../../../state/actions/paper-distribution.actions';

@Component({
  selector: 'app-shell-search-grid-digital-exam',
  templateUrl: './shell-search-grid-digital-exam.component.html',
  styleUrls: ['./shell-search-grid-digital-exam.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShellSearchGridDigitalExamComponent implements OnInit {
  shellDigitalExamGridData: GridData[];
  totalRecords: number;
  pageDetail: PageDetail;
  isSchoolUser: boolean;
  userRoleId: number;
  selectedGroupsIds: number[];
  isngOninit: boolean;
  documentStatus: string;

  groupData$: Observable<any[]>;
  subgroupData: Observable<any[]>;
  subjectData$: Observable<any[]>;
  levelData$: Observable<any[]>;
  optionData$: Observable<any[]>;
  componentData$: Observable<any[]>;
  languageData$: Observable<any[]>;

  constructor(private store: Store<any>, private route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit() {
    this.store.dispatch(pageHeading({value: 'Digital examination materials'}));
    this.isngOninit = true;
    //this is how we differentiate school user and IBO user. userRoleId 1 for IBO user and 2 for school user.
    if (this.router.url.split('/')[2] === 'digital-examination-school') {
      this.isSchoolUser = true;
      this.userRoleId = 2;

      //when switching we need to clear other dropdown intead of group
      this.store.dispatch(digitalExamActions.subgroupClear());
    } else {
      this.isSchoolUser = false;
      this.userRoleId = 1;

      //when switching we need to clear other dropdown intead of group
      this.store.dispatch(digitalExamActions.subgroupClear());
      this.store.dispatch(digitalExamActions.refreshUploadResponseState());
    }

    this.store.pipe(select(subscribe.getGridResult)).subscribe(data => {
      if (data && data.result) {
        this.shellDigitalExamGridData = data.result;
        this.totalRecords = data.totalRecords;
      }
    });

    this.store.dispatch(digitalExamActions.GroupDataLoad({ id: 9 }));
    this.groupData$ = this.store.pipe(select(subscribe.getGroupData));

    this.store.pipe(select(subscribe.getSubgroupData)).subscribe((data) => {
      let ids = this.selectedGroupsIds;
      if (data && data.length) {
        this.subgroupData = data;
      } else if (ids && ids.length && !this.isngOninit) {
        this.store.dispatch(digitalExamActions.subjectByGroupDataLoad({ ids }));
      } else {
        this.subgroupData = data;
      }
    });
    this.subjectData$ = this.store.pipe(select(subscribe.getSubjectData));
    this.levelData$ = this.store.pipe(select(subscribe.getLevelData));
    this.optionData$ = this.store.pipe(select(subscribe.getOptionData));
    this.componentData$ = this.store.pipe(select(subscribe.getComponentData));
    this.languageData$ = this.store.pipe(select(subscribe.getLanguageData));
  }

  setPageNumber(pageDetails: PageDetail): void {
    this.pageDetail = pageDetails;
    this.store.dispatch(digitalExamActions.InitialGridDataLoad({ pageDetails: pageDetails, userRoleId: this.userRoleId }));
  }

  getDigitalExaminationForm(searchParams) {
    if (searchParams) {
      this.store.dispatch(digitalExamActions.GridDataBySerachLoad({ pageDetails: this.pageDetail, searchParams: searchParams, userRoleId: this.userRoleId }));
    }
  }

  getGroupItemsIds(ids: number[]): void {
    if (ids.length === 0) {
      this.selectedGroupsIds = ids;
      this.isngOninit = false;
      this.store.dispatch(digitalExamActions.subgroupClear());
      return;
    }
    this.selectedGroupsIds = ids;
    this.store.dispatch(digitalExamActions.subgroupDataLoad({ ids }));
  }

  getSubgroupItemsIds(ids: number[]): void {
    if (ids.length === 0) {
      this.store.dispatch(digitalExamActions.subjectClear());
      return;
    }
    this.store.dispatch(digitalExamActions.subjectDataLoad({ ids }));
  }

  getSubjectIds(ids: number[]): void {
    if (ids.length === 0) {
      this.store.dispatch(digitalExamActions.levelClear());
      return;
    }
    this.store.dispatch(digitalExamActions.levelDataLoad({ ids }));
  }

  getLevelIds(ids: number[]): void {
    if (ids.length === 0) {
      this.store.dispatch(digitalExamActions.optionClear());
      return;
    }
    this.store.dispatch(digitalExamActions.optionDataLoad({ ids }));
  }

  getOptionIds(ids: number[]): void {
    if (ids.length === 0) {
      this.store.dispatch(digitalExamActions.componentClear());
      return;
    }
    this.store.dispatch(digitalExamActions.componentDataLoad({ ids }));
  }

  getcomponentIds(ids: number[]): void {
    if (ids.length === 0) {
      this.store.dispatch(digitalExamActions.languageClear());
      return;
    }
    this.store.dispatch(digitalExamActions.languageDataLoad({ ids }));
  }

  getDocumentsAvailabilityStatus(documentStatus): void {
    this.documentStatus = documentStatus;
    this.store.dispatch(digitalExamActions.InitialGridDataLoad({ pageDetails: this.pageDetail, userRoleId: this.userRoleId }));
  }

  navigateToViewPage(data) {
    this.store.dispatch(passViewDigitalUploadedData({ data: data }));
    this.router.navigate(['view-digital-exam'], { relativeTo: this.route });
  }
  getPasswordToView(data: number) {
    this.store.dispatch(viewPasswordNonMusicLoad({ fieldId: data }));
  }

  navigateToUploadPage(data) {
    this.store.dispatch(passUploadGridData({ data: data}));
    this.router.navigate(['upload-digital-exam'], { relativeTo: this.route });
  }

  getFiles(files:File[]): void {
    this.store.dispatch(digitalExamActions.documentsDownloadsLoad({ files: files }));
  }
}
