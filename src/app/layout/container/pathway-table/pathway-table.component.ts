import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Pathway} from '../../../glaucoma/models/pathway';
import {PageMeta} from '../../../glaucoma/models/page-meta';
import {Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GlobalService} from '../../../service/global/global.service';
import {TargetListParamType} from '../../../glaucoma/enum/target-list-param-type.enum';
import {DrugListParamsType} from '../../../glaucoma/enum/drug-list-param-type.enum';
import {merge} from 'rxjs/observable/merge';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'app-pathway-table',
  templateUrl: './pathway-table.component.html',
  styleUrls: ['./pathway-table.component.css']
})

export class PathwayTableComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource();
  pathways: Pathway[];
  pageMeta = new PageMeta();
  restUrl: string;
  isLoading = false;
  isLoadingError = false
  @Input() tableTitle = '';
  @Input() includeParams = '';
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>;
  @Input() pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() pageSize = 10;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  allColumns = ['pathway_id', 'pathway_name', 'target_count', 'drug_count'];
  constructor(private rest: RestService,
              private globalService: GlobalService) { }

  ngOnInit() {
    console.log('target table init');
    this.pageMeta.per_page = this.pageSize;
  }

  ngAfterViewInit() {
    this.restUrl$.subscribe(data => this.restUrl = data);
    this.sort.sortChange.subscribe(() => this.pageMeta.page = 0);
    merge(this.sort.sortChange, this.paginator.page, this.restUrl$)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.rest.getDataList(
            this.restUrl,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active,
            this.includeParams
          );
        }),
        map(data => {
          this.isLoading = false;
          this.isLoadingError = false;
          this.pageMeta = data['meta'];
          return data['pathways'];
        }),
        catchError(() => {
          this.isLoadingError = true;
          this.isLoading = false;
          return observableOf([]);
        })
      )
      .subscribe(data => {
        this.dataSource.data = data;
      });
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
    this._getPathways(event.pageIndex, event.pageSize);
  }
}
