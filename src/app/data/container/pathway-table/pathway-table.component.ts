import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {MatTableDataSource} from '@angular/material';
import {Pathway} from '../../../models/pathway';
import {PageMeta} from '../../../models/page-meta';
import {Input} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import {GlobalService} from '../../../service/global/global.service';
import {TargetListParamType} from '../../../enum/target-list-param-type.enum';
import {DrugListParamsType} from '../../../enum/drug-list-param-type.enum';

@Component({
  selector: 'app-pathway-table',
  templateUrl: './pathway-table.component.html',
  styleUrls: ['./pathway-table.component.css']
})

export class PathwayTableComponent implements OnInit {

  dataSource = new MatTableDataSource();
  pathways: Pathway[];
  pageMeta: PageMeta | null;
  restUrl: string;
  @Input() tableTitle = '';
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @Input() pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() pageSize = 10;
  allColumns = ['pathway_id', 'pathway_name', 'targets', 'drugs'];
  constructor(private rest: RestService,
              private globalService: GlobalService) { }

  ngOnInit() {
    console.log('target table init');
    this._getPathways(0, this.pageSize);  // fetch the first page
  }

  private _getPathways(page?, perpage?) {
    this.restUrl$.subscribe(data => this.restUrl = data);
    perpage = this.pageSize;
    this.rest.getDataList(this.restUrl, page, perpage)
      .subscribe(data => {
        this.pathways = data['pathways'];
        this.dataSource.data = this.pathways;
        this.pageMeta = data['meta']
      });
  }

  goTargetList(pathwayId: number | string) {
    this.globalService.gotoTargetList(TargetListParamType.pathway_id, {
      pathwayId: pathwayId
    })
  }

  goDrugList(pathwayId: number | string) {
    this.globalService.gotoDrugList(DrugListParamsType.pathway_id, {
      pathwayId: pathwayId
    })
  }

  pageChange(event) {
    this._getPathways(event.pageSize, event.pageIndex);
  }
}
