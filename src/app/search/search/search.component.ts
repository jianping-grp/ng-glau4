import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from '../../service/global/global.service';
import {TargetListParamType} from '../../enum/target-list-param-type.enum';
import {DrugListParamsType} from '../../enum/drug-list-param-type.enum';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  structureTypes = ['structure', 'substructure'];
  structureType = this.structureTypes[0];
  similarity = 0.9;
  constructor(private router: Router,
              private globalService: GlobalService,
              ) { };

  ngOnInit() {
  }

  goTargetList(keyword: string) {
    if (keyword.toUpperCase().endsWith('HUMAN')) {
      this.globalService.gotoTargetList(TargetListParamType.entry_name, {
        entryName: keyword
      })
    } else {
      this.globalService.gotoTargetList(TargetListParamType.target_name, {
        targetName: keyword
      })

    }

  }

 goDrugList(drugName: string) {
    this.globalService.gotoDrugList(DrugListParamsType.drug_name, {
      drugName: drugName
    })
 }

  goTargetPrediction(smiles: string) {
    this.router.navigate(['target/target-prediction', smiles])
  }

  onSubmit(smiles: string) {
      if (this.structureType === 'structure') {
        this.router.navigate(['molecule/molecule-drug'], {queryParams: {
          structureType: this.structureType,
          smiles: smiles,
          similarity: this.similarity
        }})
      } else if ( this.structureType === 'substructure') {
        this.router.navigate(['molecule/molecule-drug'], {queryParams: {
          structureType: this.structureType,
          smiles: smiles,
        }})
      }
    }
}
