import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {DrugbankId} from '../../../models/drugbank-id';
import {PageMeta} from '../../../models/page-meta';
import {Target} from '../../../models/target';

@Component({
  selector: 'app-drug-for-target',
  templateUrl: './drug-for-target.component.html',
  styleUrls: ['./drug-for-target.component.css']
})

export class DrugForTargetComponent implements OnInit {
  drugbankIds: DrugbankId[];
  targets = [];
  selectedTargetName = 'All';
  pageMeta: PageMeta | null;
  pageIndex: number;
  pageSize = 40;
  tableTitle = '';
  pageSizeOptions = [10, 20, 50, 100];
  constructor(private rest: RestService) { }

  ngOnInit() {
    console.log('drug for target init');
    this._getTargetName();
    // this._getAllDrugBankIds();
    this.getDrugbankIds();
  }

  getDrugbankIds() {
    this.pageIndex = 0;
    if (this.selectedTargetName === 'All') {
      this._getAllDrugBankIds(0, 32);
    } else {
      this._getDrugbankIdByTargetName(0, 32);
    }
  }

  private _getDrugbankIdByTargetName(page?, perPage?) {
    this.rest.getDataList(`drugbankid/?filter{target_set.protein_description}=${this.selectedTargetName}`, page, perPage)
      .subscribe(data => {
        this.drugbankIds = data['drug_bank_ids'];
        this.pageMeta = data['meta'];
      })
  }

  private _getAllDrugBankIds(page?, perPage?) {
    this.rest.getDataList(`drugbankid/?`, page, perPage)
      .subscribe(data => {
        this.drugbankIds = data['drug_bank_ids'];
        this.pageMeta = data['meta'];
      })
  }

  private _getTargetName() {
    this.rest.getDataList(`target/?exclude[]=*&include[]=protein_description&sort[]=protein_description`, 0, 999999)
      .subscribe(data => {
        this.targets = data['targets'];
        this.targets.unshift({protein_description: 'All'});
        console.log(this.targets.length, this.targets)
      })
  }

  pageChange(event) {
    this.pageIndex = this.pageIndex + 1;
    if (this.selectedTargetName === 'All') {
      this._getAllDrugBankIds(this.pageIndex, event.pageSize)
    } else  {
      this._getDrugbankIdByTargetName(this.pageIndex, event.pageSize)
    }
  }
}
