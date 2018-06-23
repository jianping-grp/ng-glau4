import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GlobalService} from './service/global/global.service';
import {DrugListParamsType} from './glaucoma/enum/drug-list-param-type.enum';
import {TargetListParamType} from './glaucoma/enum/target-list-param-type.enum';
import {PathwayListParamType} from './glaucoma/enum/pathway-list-param-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'GCDB';
  loadingStatus: boolean;
  screenHeight: string;
  constructor(private globalService: GlobalService,
              private cd: ChangeDetectorRef) {
    this.globalService.loadingStatus$
      .subscribe(status => {
        this.loadingStatus = status;
        this.cd.detectChanges();
      })
  }

  ngOnInit() {
    this.getScreenHeight();
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

  getScreenHeight(){
    const y = window.innerHeight - 212; // 204 = nav.height(52) + foot.height(80) + margin-top(60);
    this.screenHeight = y.toString() + 'px';
  }

}
