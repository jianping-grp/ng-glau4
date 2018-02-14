import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PageMeta} from '../../../models/page-meta';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {TargetListParamType} from '../../../enum/target-list-param-type.enum';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css']
})

export class TargetListComponent implements OnInit {
  includeParams = '&exclude[]=chembl_small_molecules_all_infos.*' +
    '&include[]=chembl_small_molecules_all_infos.doc_chembl_id' +
    '&exclude[]=chembl_small_molecules_structure_info.*' +
    '&include[]=chembl_small_molecules_structure_info.id' +
    '&exclude[]=drug_set.*&include[]=drug_set.id' +
    '&exclude[]=pathway_set.*&include[]=pathway_set.id';
  pageMeta: PageMeta | null;

  displayedColumns = ['chembl_id', 'target_name', 'kegg', 'uniprot_accession', 'entry_name',
    'gene',
    // 'pdbid','detail', 'type', 'drug',
    'compounds', 'bioactivities', 'references'
  ];

  restUrl$: Observable<string>;

  constructor(private rest: RestService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    console.log('target list init');
    this.restUrl$ = this._getRestUrl();
  }

  private _getRestUrl(): Observable<string> {
    return this.route.queryParamMap.map((params: ParamMap) => {
      const paramsType = +params.get('paramsType');
      if (paramsType) {
        switch (paramsType) {
          case TargetListParamType.target:
            return `target/?${this.includeParams}`;
          case TargetListParamType.entry_name: {
            const entryName = params.get('entryName');
            return `target/?filter{entry_name.icontains}=${entryName}${this.includeParams}`;
          }
          case TargetListParamType.molecule_chembl_id: {
            const moleculeChemblId = params.get('moleculeChemblId');
            return `target/?filter{chembl_small_molecules_all_infos.molecule_chembl_id}=${moleculeChemblId}${this.includeParams}`
          }
          case TargetListParamType.pathway_id: {
            const pathwayId = +params.get('pathwayId');
            return `target/?filter{pathway_set.id}=${pathwayId}${this.includeParams}`
          }
          case TargetListParamType.target_name: {
            const targetName = +params.get('targetName');
            return `target/?filter{protein_description.icontains}${targetName}${this.includeParams}`
          }
        }
      }
    })
  }
}
