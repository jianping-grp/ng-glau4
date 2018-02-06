import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {Drug} from '../../../models/drug';
import {Target} from '../../../models/target';
import {Pathway} from '../../../models/pathway';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-drug-detail',
  templateUrl: './drug-detail.component.html',
  styleUrls: ['./drug-detail.component.css']
})

export class DrugDetailComponent implements OnInit {
  drug: Drug;
  targetList: Target[] | null;
  pathwayList: Pathway[] | null;
  targetRestUrl$: Observable<string>;
  pathwayRestUrl$: Observable<string>;
  dataSource = new MatTableDataSource();
  includeParams = '?include[]=targets.*&include[]=pathway_set.*';
  targetDisplayedColumns = ['chembl_id', 'target_name', 'kegg', 'uniprot_accession', 'entry_name', 'gene',
    // 'pdbid','type',
    // 'compounds', 'bioactivities', 'references'
  ];
  pathwayDisplayedColumns = ['pathway_id', 'pathway_name'];
  targetIncludeParams = '&exclude[]=chembl_small_molecules_all_infos.*' +
    '&include[]=chembl_small_molecules_all_infos.doc_chembl_id' +
    '&exclude[]=chembl_small_molecules_structure_info.*' +
    '&include[]=chembl_small_molecules_structure_info.id' +
    '&exclude[]=drug_set.*&include[]=drug_set.id' +
    '&exclude[]=pathway_set.*&include[]=pathway_set.id';
  pathwayIncludeParams = '&exclude[]=targets.*&include[]=targets.id' +
    '&exclude[]=drugs.*&include[]=drugs.id';

  constructor(private rest: RestService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('drug-detail');
    this._getDrugDetail();
  }

  private _getDrugDetail() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id');
      this.targetRestUrl$ = Observable.of(`target/?filter{drug_set.id}=${id}${this.targetIncludeParams}`);
      this.pathwayRestUrl$ = Observable.of(`pathway/?filter{drugs.id}=${id}${this.pathwayIncludeParams}`);
      this.rest.getData(`drugs/${id}/${this.includeParams}`)
        .subscribe(data => {
          this.drug = data['drug'];
          this.targetList = data['drug']['targets'];
          this.pathwayList = data['drug']['pathway_set'];
          this.dataSource.data = this.targetList;
        })
    })
  }
}
