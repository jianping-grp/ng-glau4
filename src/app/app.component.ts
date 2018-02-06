import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {GlobalService} from './service/global/global.service';
import {DrugListParamsType} from './enum/drug-list-param-type.enum';
import {TargetListParamType} from './enum/target-list-param-type.enum';
import {PathwayListParamType} from './enum/pathway-list-param-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  AfterViewChecked {
  title = 'GCDB';
  loadingStatus: boolean;
  constructor(private globalService: GlobalService,
              private cd: ChangeDetectorRef) {
    this.globalService.loadingStatus$
      .subscribe(status => {
        this.loadingStatus = status;
        this.cd.detectChanges();
      })
  }

  ngAfterViewChecked() {

  }

  goDrugList() {
    this.globalService.gotoDrugList(DrugListParamsType.drug)
  }

  goTargetList() {
    this.globalService.gotoTargetList(TargetListParamType.target)
  }

  goPathwayList() {
    this.globalService.gotoPathwayList(PathwayListParamType.pathway)
  }

}
