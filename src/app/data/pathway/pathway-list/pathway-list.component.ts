import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/map';
import {PathwayListParamType} from '../../../enum/pathway-list-param-type.enum';


@Component({
  selector: 'app-pathway',
  templateUrl: './pathway-list.component.html',
  styleUrls: ['./pathway-list.component.css']
})

export class PathwayListComponent implements  OnInit {
  restUrl$: Observable<string>;
  displayedColumns = ['pathway_id', 'pathway_name', 'targets', 'drugs'];
  includeParams = '&exclude[]=targets.*&include[]=targets.id' +
                  '&exclude[]=drugs.*&include[]=drugs.id';

  constructor(private rest: RestService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('pathway init');
    this.restUrl$ = this._getRestUrl();
  }
  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
      const paramsType = +params.get('paramsType');
      if (paramsType) {
        switch (paramsType) {
          case PathwayListParamType.pathway:
            return `pathway/?${this.includeParams}`
          case PathwayListParamType.target_id: {
            const targetId = +params.get('targetId');
            return `pathway/?filter{targets.id}=${targetId}${this.includeParams}`
          }
        }
      }
    })
  }
}
