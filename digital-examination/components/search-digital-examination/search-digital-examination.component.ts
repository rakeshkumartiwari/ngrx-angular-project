import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IDropdownConfig } from '@ibo/ibo-shared-lib';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DocumentsAvailability, GridData } from '../../models/digital-examination.model';


@Component({
  selector: 'app-search-digital-examination',
  templateUrl: './search-digital-examination.component.html'
})
export class SearchDigitalExaminationComponent implements OnInit, OnChanges {

  @Input() isSchoolUser: boolean;
  @Input() groupData: any[];
  @Input() subgroupData: any[];
  @Input() subjectData: any[];
  @Input() levelData: any[];
  @Input() optionData: any[];
  @Input() componentData: any[];
  @Input() languageData: any[];
  @Input() compDigitalExaminationGridData: GridData[]


  @Output() groupItemsIds = new EventEmitter<any>();
  @Output() subgroupItemsIds = new EventEmitter<any>();
  @Output() subjectIds = new EventEmitter<any>();
  @Output() levelIds = new EventEmitter<any>();
  @Output() optionIds = new EventEmitter<any>();
  @Output() componentIds = new EventEmitter<any>();
  @Output() digitalExamination = new EventEmitter<any>();
  @Output() DocumentsAvailabilityStatus = new EventEmitter<any>();

  digitalExaminationForm: FormGroup;
  griDataCount: number;

  dropdownSettingsGroup: IDropdownConfig = {
    singleSelection: false,
    defaultOpen: false,
    idField: 'id',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableCheckAll: true,
    itemsShowLimit: 8,
    allowSearchFilter: false,
    clearSearchFilter: true,
  };
  dropdownSettingsSubgroup: IDropdownConfig = {
    singleSelection: false,
    defaultOpen: false,
    idField: 'id',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableCheckAll: true,
    itemsShowLimit: 8,
    allowSearchFilter: false,
    clearSearchFilter: true,
  };
  dropdownSettingsSubject: IDropdownConfig = {
    singleSelection: false,
    defaultOpen: false,
    idField: 'id',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableCheckAll: true,
    itemsShowLimit: 8,
    allowSearchFilter: false,
    clearSearchFilter: true,
  };
  dropdownSettingsLevel: IDropdownConfig = {
    singleSelection: false,
    defaultOpen: false,
    idField: 'id',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableCheckAll: true,
    itemsShowLimit: 8,
    allowSearchFilter: false,
    clearSearchFilter: true,
  };
  dropdownSettingsOption: IDropdownConfig = {
    singleSelection: false,
    defaultOpen: false,
    idField: 'id',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableCheckAll: true,
    itemsShowLimit: 8,
    allowSearchFilter: false,
    clearSearchFilter: true,
  };
  dropdownSettingsComponent: IDropdownConfig = {
    singleSelection: false,
    defaultOpen: false,
    idField: 'id',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableCheckAll: true,
    itemsShowLimit: 8,
    allowSearchFilter: false,
    clearSearchFilter: true,
  };
  dropdownSettingsLanguage: IDropdownConfig = {
    singleSelection: false,
    defaultOpen: false,
    idField: 'id',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableCheckAll: true,
    itemsShowLimit: 8,
    allowSearchFilter: false,
    clearSearchFilter: true,
  };

  constructor(private formbuilder: FormBuilder) { }

  ngOnChanges() {
    if (this.compDigitalExaminationGridData && this.compDigitalExaminationGridData.length) {
      this.griDataCount = this.compDigitalExaminationGridData.length;
    }
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.digitalExaminationForm = this.formbuilder.group({
      group: [null, [Validators.required]],
      subgroup: [null, []],
      subject: [null, []],
      level: [null, []],
      option: [null, []],
      component: [null, []],
      language: [null, []],
      documentsAvailability: ['all', []]
    });
  }

  clearForm(): void {
    this.digitalExaminationForm.reset();
    this.digitalExaminationForm.markAsPristine();
    this.digitalExaminationForm.controls['documentsAvailability'].setValue('all');
    this.DocumentsAvailabilityStatus.emit(DocumentsAvailability.ALL);
  }

  /*
  *Emits an event to search courses
  */
  onSearch(): void {
    if (this.digitalExaminationForm.valid) {
      this.digitalExaminationForm.markAllAsTouched();
      let payload = {
        groupList: this.digitalExaminationForm.value.group,
        subgroupList: this.digitalExaminationForm.value.subgroup ? this.digitalExaminationForm.value.subgroup : [],
        subjectList: this.digitalExaminationForm.value.subject ? this.digitalExaminationForm.value.subject : [],
        levelList: this.digitalExaminationForm.value.level ? this.digitalExaminationForm.value.level : [],
        optionList: this.digitalExaminationForm.value.option ? this.digitalExaminationForm.value.option : [],
        componentList: this.digitalExaminationForm.value.component ? this.digitalExaminationForm.value.component : [],
        languageList: this.digitalExaminationForm.value.language ? this.digitalExaminationForm.value.language : []
      };
      if (this.digitalExaminationForm.value.documentsAvailability === DocumentsAvailability.AVAILABEL) {
        payload['documentsAvailability'] = true;
      }
      if (this.digitalExaminationForm.value.documentsAvailability === DocumentsAvailability.NOT_AVAILABLE) {
        payload['documentsAvailability'] = false;
      }
      this.digitalExamination.emit(payload);
    }
  }

  /*
    checks to see whether to disableSaveButton
   */
  disableSaveButton(): string {
    if (!this.digitalExaminationForm.valid) {
      return 'searchCourseBtn disabled ';
    } else {
      return 'searchCourseBtn apply';
    }
  }

  /*
    Emits an event on selection of subject group
    */
  onGroupSelect(event): void {
    if (event.length === 0) {
      this.digitalExaminationForm.get('subgroup').reset();
    }
    this.onDropDwnClear('subgroup');
    const ids = event.map(item => {
      const exist = this.groupData.find(el => el.id === item.id);
      if (exist) {
        return exist.id;
      }
      return 0;

    });
    this.groupItemsIds.emit(ids);
  }


  /*
    Emits an event on selection of subject subgroup
   */
  onSubgroupSelect(event): void {
    if (event.length === 0) {
      this.digitalExaminationForm.get('subject').reset();
    }
    this.onDropDwnClear('subject');
    const ids = event.map(item => item.id);
    this.subgroupItemsIds.emit(ids);
  }

  /*
 Emits an event on selection of subject
*/
  onSubjectSelect(event): void {
    if (event.length === 0) {
      this.digitalExaminationForm.get('level').reset();
    }
    this.onDropDwnClear('level');
    const ids = event.map(item => item.id);
    this.subjectIds.emit(ids);
  }

  /*
   Emits an event on selection of levels
  */
  onLevelSelect(event): void {
    if (event.length === 0) {
      this.digitalExaminationForm.get('option').reset();
    }
    this.onDropDwnClear('option');
    const ids = [];
    event.map(e => {
      const selectedLevel = this.levelData.find(item => item.id === e.id);
      ids.push(selectedLevel.id);
    });
    this.levelIds.emit(ids);
  }

  /*
   Emits an event on selection of option
  */
  onOptionSelect(event): void {
    if (event.length === 0) {
      this.digitalExaminationForm.get('component').reset();
    }
    this.onDropDwnClear('component');
    const ids = [];
    event.map(e => {
      const selectedOption = this.optionData.find(item => {
        return item.id === e.id;
      });
      ids.push(selectedOption.id);
    });
    this.optionIds.emit(ids);
  }


  /*
   Emits an event on selection of component
  */
  onComponentSelect(event): void {
    if (event.length === 0) {
      this.digitalExaminationForm.get('language').reset();
    }
    const ids = [];
    event.map(e => {
      const selectedComponent = this.componentData.find(item => {
        return item.id === e.id;
      });
      ids.push(selectedComponent.id);
    });
    this.componentIds.emit(ids);
  }

  onDropDwnClear(key: string): void {
    switch (key) {
      case 'group':
        this.digitalExaminationForm.get('subgroup').reset();
        this.digitalExaminationForm.get('subject').reset();
        this.digitalExaminationForm.get('level').reset();
        this.digitalExaminationForm.get('option').reset();
        this.digitalExaminationForm.get('component').reset();
        this.digitalExaminationForm.get('language').reset();
        break;

      case 'subgroup':
        this.digitalExaminationForm.get('subject').reset();
        this.digitalExaminationForm.get('level').reset();
        this.digitalExaminationForm.get('option').reset();
        this.digitalExaminationForm.get('component').reset();
        this.digitalExaminationForm.get('language').reset();
        break;
      case 'subject':
        this.digitalExaminationForm.get('level').reset();
        this.digitalExaminationForm.get('option').reset();
        this.digitalExaminationForm.get('component').reset();
        this.digitalExaminationForm.get('language').reset();
        break;
      case 'level':
        this.digitalExaminationForm.get('option').reset();
        this.digitalExaminationForm.get('component').reset();
        this.digitalExaminationForm.get('language').reset();
        break;
      case 'option':
        this.digitalExaminationForm.get('component').reset();
        this.digitalExaminationForm.get('language').reset();
        break;
      case 'component':
        this.digitalExaminationForm.get('language').reset();
        break;
      case 'all':
        this.digitalExaminationForm.get('group').reset();
        this.digitalExaminationForm.get('subgroup').reset();
        this.digitalExaminationForm.get('subject').reset();
        this.digitalExaminationForm.get('level').reset();
        this.digitalExaminationForm.get('option').reset();
        this.digitalExaminationForm.get('component').reset();
        this.digitalExaminationForm.get('language').reset();
        break;
      default:
        break;
    }
  }

  clearAll() {
    this.onDropDwnClear('all');
   
  }

  onRadioButtonChange(): void {
    switch (this.digitalExaminationForm.value.documentsAvailability) {
      case DocumentsAvailability.AVAILABEL:
        this.DocumentsAvailabilityStatus.emit(DocumentsAvailability.AVAILABEL);
        break;
      case DocumentsAvailability.NOT_AVAILABLE:
        this.DocumentsAvailabilityStatus.emit(DocumentsAvailability.NOT_AVAILABLE);
        break;
      default:
        this.DocumentsAvailabilityStatus.emit(DocumentsAvailability.ALL);
        break
    }
  }

}
