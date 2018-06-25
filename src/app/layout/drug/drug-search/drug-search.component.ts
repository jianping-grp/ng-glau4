import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {of as observableOf} from "rxjs/observable/of";

@Component({
  selector: 'app-drug-search',
  templateUrl: './drug-search.component.html',
  styleUrls: ['./drug-search.component.css']
})
export class DrugSearchComponent implements OnInit {
  drugRestUrl$: Observable<string>;
  drugForTargetRestUrl$: Observable<string>;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRestUrl();
  }

  getRestUrl() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      if (params.has('drugbankId')) {
        const drugbankId = params.get('drugbankId');
        this.drugRestUrl$ = observableOf(`drugs/?filter{drugbank_id}=${drugbankId}`);
        this.drugForTargetRestUrl$ = observableOf(`drugbankid/?filter{drugbank_id}=${drugbankId}`);
      } else if (params.has('drugName')) {
        const drugName = params.get('drugName');
        this.drugRestUrl$ = observableOf(`drugs/?filter{drug_name.icontains}=${drugName}`);
        this.drugForTargetRestUrl$ = observableOf(`drugbankid/?filter{generic_name.icontains}=${drugName}`);
      }
   })
  }
}
