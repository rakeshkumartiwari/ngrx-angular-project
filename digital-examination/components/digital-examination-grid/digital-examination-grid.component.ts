import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { SharedSortService, ExportService } from '@ibo/ibo-shared-lib';
import { PageDetail, GridData, File, OsVersion, DocumentsAvailability } from '../../models/digital-examination.model';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import * as subscribe from '../../state/selectors/digital-examination-selector'

@Component({
  selector: 'app-digital-examination-grid',
  templateUrl: './digital-examination-grid.component.html'
})
export class DigitalExaminationGridComponent implements OnInit, OnChanges {

  @ViewChild('courseHeaderTemplate', { static: true }) courseHeaderTemplate: TemplateRef<any>;
  @ViewChild('actionButtonTemplate', { static: true }) actionButtonTemplate: TemplateRef<any>;


  @Input() isSchoolUser: boolean;
  @Input() compDigitalExaminationGridData: GridData[]
  @Input() totalRecords: number;
  @Input() pageDetail: PageDetail;
  @Input() documentStatus: string;

  @Output() pageNumber = new EventEmitter<number>();
  @Output() snapShotData = new EventEmitter<any>();
  @Output() emitViewData = new EventEmitter<any>();
  @Output() emitFieldIdData = new EventEmitter<any>();
  @Output() emitFiles = new EventEmitter<any>();
  @Output() emitUploadData = new EventEmitter<any>();

  setPasswordValue = '';
  viewPasswordTitle = 'View password';
  compDigitalExaminationGridDataStr: any;
  title = 'Download digital examination materials';
  isWindows: boolean;
  isMac: boolean;
  windows: string;
  mac: string;
  backupData: GridData[] = [];
  digitalExaminationGridData: GridData[] = [];
  showIcon: string;
  filteredDigitalExamData: any;
  tableConfig: any = {};
  columns: any;
  showModal = false;
  showViewPasswordModal = false;
  showFilter = '';
  sortBy = 'courseDetails';
  childName = 'courseId';
  private searchCriteria = {};
  private position = true;
  private lastPosition = true;
  private lastSortBy = '';
  files: File[] = [];
  isScanPending: boolean;

  constructor(private datePipe: DatePipe, private store: Store<any>) { }

  ngOnChanges(): void {
    if (this.documentStatus && this.compDigitalExaminationGridData) {
      this.showTableByDocumentsAvailability(this.documentStatus);
    }

    if (this.compDigitalExaminationGridData) {
      this.compDigitalExaminationGridDataStr = JSON.parse(JSON.stringify(this.compDigitalExaminationGridData));
      if (this.compDigitalExaminationGridDataStr) {
        this.compDigitalExaminationGridDataStr.forEach(((item: GridData) => {
          const displayDate = this.DateForDisplay(item.examStartDate);
          this.isScanPending = false;
          let uploadedDocumentsStr = '';
          item['examStartDateStr'] = displayDate;
          item['uploadedDocuments'] = '';

          item.files.every((file: File) => {

            if (file && file.scanStatus == ('101' || '500')) {
              item['uploadedDocuments'] = '';
              item['uploadedDocuments'] = 'Virus scan is in progress';
              item.isDownloadAllowed = false;
              item.isEditAllowed = false;
              item.isDownloadAllowed = false;
              item.isUploadAllowed = true;
            }
            if (file && file.displayName && file.scanStatus != ('101' || '500')) {
              uploadedDocumentsStr += `${file.displayName}, `;
              item['uploadedDocuments'] = uploadedDocumentsStr.replace(/,\s*$/, "");
              item.isDownloadAllowed = true;
              item.isEditAllowed = true;
              item.isDownloadAllowed = true;
              item.isUploadAllowed = false;
            }
          });
        }));
      }
    }
    if (this.compDigitalExaminationGridDataStr) {
      this.digitalExaminationGridData = this.compDigitalExaminationGridDataStr;
      this.backupData = this.compDigitalExaminationGridDataStr;
      this.initFilterOptions();
    }
  }
  ngOnInit() {
    this.initializeTableInfo();
  }

  initFilterOptions(): void {
    this.resetOperations();
    if (this.tableConfig) {
      this.setTableConfig();
    }
  }
  setTableConfig(): void {
    this.tableConfig.showSearch = (this.backupData && this.backupData.length > 10);
    this.tableConfig.showLoading = !(this.compDigitalExaminationGridDataStr);
    this.tableConfig.showNoResultFound = !(this.compDigitalExaminationGridDataStr && this.compDigitalExaminationGridDataStr.length);
  }

  showTableByDocumentsAvailability(documentStatus: string) {
    switch (documentStatus) {
      case DocumentsAvailability.AVAILABEL:
        this.compDigitalExaminationGridData =
          this.compDigitalExaminationGridData
            .filter(item => item.isDownloadAllowed)
        break;
      case DocumentsAvailability.NOT_AVAILABLE:
        this.compDigitalExaminationGridData =
          this.compDigitalExaminationGridData
            .filter(item => item.isUploadAllowed)
        break;
      default:
        break
    }
  }


  initializeTableInfo() {
    if (this.isSchoolUser) {
      this.columns = [
        {
          title: 'Course details',
          data: 'courseDetails',
          dataName: 'courseDetails',
          filter: true,
          class: '',
          input: '',
          sortByCol: true,
          placeholder: 'Search',
          width: 15
        },
        {
          title: 'Exam date',
          data: 'examStartDateStr',
          dataName: 'examStartDateStr',
          filter: true,
          class: '',
          input: '',
          sortByCol: true,
          placeholder: 'Search',
          width: 8
        },
        {
          title: 'Session',
          data: 'session',
          dataName: 'session',
          filter: false,
          class: '',
          input: '',
          sortByCol: true,
          placeholder: 'Search',
          width: 10
        },
        {
          title: 'Action',
          data: 'action',
          dataName: '',
          filter: false,
          class: 'action',
          sortByCol: false,
          placeholder: 'Search',
          width: 12,
          template: {
            templateContent: this.actionButtonTemplate
          }
        },

      ];
    } else {
      this.columns = [
        {
          title: 'Course details',
          data: 'courseDetails',
          dataName: 'courseDetails',
          filter: true,
          class: '',
          input: '',
          sortByCol: true,
          placeholder: 'Search',
          width: 10
        },
        {
          title: 'Uploaded documents',
          data: 'uploadedDocuments',
          dataName: 'uploadedDocuments',
          filter: false,
          class: '',
          input: '',
          sortByCol: true,
          placeholder: 'Search',
          width: 10
        },
        {
          title: 'Action',
          data: 'action',
          dataName: '',
          filter: false,
          class: 'action',
          sortByCol: false,
          placeholder: 'Search',
          width: 12,
          template: {
            templateContent: this.actionButtonTemplate
          }
        },

      ];

    }
    this.tableConfig = {
      columns: this.columns,
      loading: 'Loading...',
      noResultFound: 'No result found',
      showSearch: false,
      showLoading: true,
      showNoResultFound: false,
      isNotification: false,
      // subTitle: {
      //   name: 'Search result',
      // },
      notification: {
        show: false,
        name: ''
      },
      uniqueId:'courseId'

    };

  }

  setCurrentPage(pageDetail): void {
    this.pageNumber.emit(pageDetail);
  }

  /**
   * Reset the Sort Icon to Default
   */
  resetOperations(): void {
    this.showIcon = 'default';
    this.filteredDigitalExamData = this.compDigitalExaminationGridData;
    const sortedData = this.sortByCriteria(this.digitalExaminationGridData, 'subjectName', true, 'subjectName');
    this.filteredDigitalExamData = this.digitalExaminationGridData = sortedData;
  }

  navigateToAction(event: { data: GridData, viewType: string }): void {
    this.snapShotData.emit(event.data);
  }

  selectedRows({ data, exportType }): void {
    const formattedData = this.formatFileData(data);
    if (exportType === 'csv') {
      new ExportService().exportToCSV(formattedData);
    } else if (exportType === 'excel') {
      new ExportService().exportDataToExcel(formattedData);
    } else {
      new ExportService().exportToPDF(formattedData);
    }
  }

  formatFileData(gridData): GridData[] {
    const data: GridData[] = [];
    if (this.isSchoolUser) {
      gridData.map((item: GridData) => {
        const temp: any = {};
        temp['Course details'] = (item.courseDetails) ? item.courseDetails : '';
        temp['Exam Date'] = (item['examStartDateStr']) ? item['examStartDateStr'] : '';
        temp['Session'] = (item.session) ? item.session : '';
        data.push(temp);
      });
    } else {
      gridData.map((item: GridData) => {
        const temp: any = {};
        temp['Course details'] = (item.courseDetails) ? item.courseDetails : '';
        temp['Uploaded documents'] = (item['uploadedDocuments']) ? item['uploadedDocuments'] : '';
        data.push(temp);
      });
    }
    return data;
  }

  /**
  * Filters the Column
  * @param event Event of Input
  * @param childName Name of the Child Object to be Sorted
  * @param id Used to Clear Input
  */
  filterByColumn(filterDetail?: { event?: any, childName?: string }): void {
    if (filterDetail.event) {
      this.resetOperations();
      const name = filterDetail.event.target.name;
      const prop = String(filterDetail.event.target.value).toLocaleLowerCase().trim();
      this.searchCriteria = {};
      this.searchCriteria[name] = prop.length && prop;

      if (!Object.keys(this.searchCriteria[name]).length) {
        delete this.searchCriteria[name];
      }

    }
    if (this.backupData && this.searchCriteria) {
      this.filteredDigitalExamData = this.filterByEachColumn();
      this.digitalExaminationGridData = this.filteredDigitalExamData;
    }
  }

  filterByEachColumn(): any {
    let nestedFilter;
    nestedFilter = (targetArray, filters) =>
      targetArray.filter(o => Object.keys(filters).every(k =>
        String(o[k]).toLowerCase().startsWith(String(filters[k]).toLowerCase())));

    if (!Object.keys(this.searchCriteria).length) {
      return this.backupData;
    }
    const result = nestedFilter(this.backupData, this.searchCriteria);
    return result;
  }

  /**
     * Apply Sort on Click of Sort Icon
     */
  applyFilterOptions(): void {
    const sortedData: Array<any> = this.sortByCriteria(this.backupData, this.sortBy, this.position, this.childName);
    this.filteredDigitalExamData = this.digitalExaminationGridData = sortedData;
    this.lastPosition = this.position;
    this.lastSortBy = this.sortBy;
  }


  /**
   * Set the Sort Param and Applies Sort
   * @param dir show ascending and descending Icon
   * @param sortBy Name of the Parent Object to be Sorted
   * @param name Name of the Child Object to be Sorted
   */
  private setSort(dir: string, sortBy: string, name: string): void {
    this.sortBy = sortBy;
    this.position = dir === 'asc' ? true : false;
    this.childName = name ? name : null;
    this.applyFilterOptions();
  }

  /**
     * Assigns the parameter for Sorting and Filter Operation
     * @param dir show ascending and descending Icon
     * @param sortBy Name of the Parent Object to be Sorted
     * @param name Name of the Child Object to be Sorted
     * @param title Title shown in table header
     */
  toggleFilterMenu(sortDetail: { dir: string, id: number, sortBy?: string, name?: string, title?: string }): void {
    this.digitalExaminationGridData = this.backupData;
    this.showIcon = sortDetail.dir;
    this.showFilter = sortDetail.title;
    this.position = this.lastPosition;
    this.sortBy = this.lastSortBy;
    this.setSort(sortDetail.dir, sortDetail.sortBy, sortDetail.name);
    if (sortDetail.dir === 'default') {
      this.resetOperations();
    }
  }


  /**
   * Sort for shared-tool called
   * @param data Programme Managemnt Details from Shell
   * @param sortBy Name of the Parent Object to be Sorted
   * @param position boolean true if 'asc' else false
   * @param childName Name of the Child Object to be Sorted
   */
  sortByCriteria(data: any[], sortBy: string, position: boolean, childName?: string, type?: string): any[] {
    return new SharedSortService(
      data,
      sortBy,
      position,
      childName,
    ).sort();
  }

  filterFromPop(filterConfig: Array<any> | any) {
    const pos = filterConfig['position'] === 'asc' ? true : false;
    const data = filterConfig['colObj']['data'];
    const dataName = filterConfig['colObj']['dataName'];
    const selectedData = filterConfig['selectedData'].slice();
    const sortData = this.sortByCriteria(selectedData, data, pos, dataName);
    this.filteredDigitalExamData = this.digitalExaminationGridData = sortData;
    this.lastPosition = pos;
    this.lastSortBy = data;
  }

  DateForDisplay(unformatDate: string): string {
    let formatedDate = '';
    formatedDate = this.datePipe.transform(unformatDate, 'dd-MMM-yyyy', '+0000');
    return formatedDate;
  }

  openModal(data: GridData): void {
    this.files = [];
    this.isWindows = false;
    this.isMac = false;

    //file which contain musicPackage
    if (data && data.files && data.files.length && data.files[0].isMusicPackage) {
      data.files.forEach((file: File) => {
        if (file.osVersion.toLocaleLowerCase() === OsVersion.WINDOWS) {
          this.isWindows = true;
          this.files.push(file)
        }
        if (file.osVersion.toLocaleLowerCase() === OsVersion.MAC) {
          this.isMac = true;
          this.files.push(file)
        }
      });
      this.showModal = true;
    }

    //file which contain nonMusicPackage
    if (data && data.files && data.files.length && !data.files[0].isMusicPackage) {
      this.emitFiles.emit(data.files);
    }

  }

  hideModal(): void {
    this.showModal = false;
  }

  onDownload(): void {
    let ids = [];
    if (!this.isWindows) {
      this.files = this.files.filter(file => file.osVersion.toLocaleLowerCase() != OsVersion.WINDOWS)
    }
    if (!this.isMac) {
      this.files = this.files.filter(file => file.osVersion.toLocaleLowerCase() != OsVersion.MAC)
    }
    this.emitFiles.emit(this.files);
    this.hideModal();
  }

  disableDownloadButton(): string {
    if (!this.isMac && !this.isWindows) {
      return 'searchCourseBtn disabled';
    } else {
      return 'searchCourseBtn apply';
    }
  }
  navigateToView(event) {
    const obj = {
      course: event.courseDetails,
      uploadedFiles: event.files
    }
    this.emitViewData.emit(obj);
  }
  viewPassword(data) {
    this.emitFieldIdData.emit(data['files'][0]['fileId']);
    this.store.pipe(select(subscribe.getPasswordDataToView)).subscribe(password => {
      if (password) {
        this.setPasswordValue = password;
        this.showViewPasswordModal = true;
      } else {
        this.setPasswordValue = '';
        this.showViewPasswordModal = false;
      }
    });
  }
  hideViewPasswordModal(): void {
    this.showViewPasswordModal = false;
  }

  navigateToUpload(event) {
    this.emitUploadData.emit(event);
  }
}
