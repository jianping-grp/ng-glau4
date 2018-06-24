import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from '../../../service/global/global.service';
import {TargetListParamType} from '../../../glaucoma/enum/target-list-param-type.enum';
import {DrugListParamsType} from '../../../glaucoma/enum/drug-list-param-type.enum';
import {PathwayListParamType} from "../../../glaucoma/enum/pathway-list-param-type.enum";
import {JsmeComponent} from '../../../jsme/jsme/jsme.component';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  @ViewChild(JsmeComponent) jsme: JsmeComponent;
  jsmeSmiles: string;
  structureTypes = ['structure', 'substructure'];
  structureType = this.structureTypes[0];
  similarity = 0.9;
  drugSearchTypeList = [
    {inputType: 'Drug name', value: 'Acetazolamide'},
    {inputType: 'Drugbank ID', value: 'DB00819'},
  ];
  drugSelectedType = this.drugSearchTypeList[0].inputType;
  drugKeyword = this.drugSearchTypeList[0].value;
  targetSearchTypeList = [
    {inputType: 'Target name', value: 'Alpha-1B adrenergic receptor'},
    {inputType: 'Entry name', value: 'ADA1B_HUMAN'},
    {inputType: 'Gene name', value: 'ADRA1B'},
    {inputType: 'ChEMBL ID', value: 'CHEMBL232'}
  ];
  targetSelectedType = this.targetSearchTypeList[0].inputType;
  targetKeyword = this.targetSearchTypeList[0].value;
  pathwaySearchTypeList = [
    {inputType: 'Pathway name', value: 'Vascular smooth muscle contraction'},
    {inputType: 'Pathway ID', value: 'hsa04270'}
  ];
  pathwaySelectedType = this.pathwaySearchTypeList[0].inputType;
  pathwayKeyword = this.pathwaySearchTypeList[0].value;

  constructor(private router: Router,
              private globalService: GlobalService,
              ) { };

  ngOnInit() {
    this.jsmeSmiles = 'CNCC(O)c1ccc(OC(=O)C(C)(C)C)c(OC(=O)C(C)(C)C)c1';
  }

  getJsmeSmiles() {
    this.jsmeSmiles = this.jsme.smiles;
  }

  drugSearchTypeChange(selectedType: string) {
    this.drugKeyword = this.drugSearchTypeList.find(el => el.inputType === selectedType).value;
  }

  drugSubmit() {
    this.drugKeyword = this.drugKeyword.trim();
    if (this.drugSelectedType === 'Drug name') {
      this.router.navigate(['drug-glau-treatment/drug-search'], {
        queryParams: {
          drugName: this.drugKeyword
        }
      })
    } else if (this.drugSelectedType === 'Drugbank ID') {
      this.router.navigate(['drug-glau-treatment/drug-search'], {
        queryParams: {
          drugbankId: this.drugKeyword
        }
      })
    }
  }

  targetSearchTypeChange(selectedType: string) {
    this.targetKeyword = this.targetSearchTypeList.find(el => el.inputType === selectedType).value;
  }

  targetSubmit() {
    this.targetKeyword = this.targetKeyword.trim();
    if (this.targetSelectedType === 'Target name') {
      this.globalService.gotoTargetList(TargetListParamType.target_name, {
        targetName: this.targetKeyword
      });
    } else if (this.targetSelectedType === 'Entry name') {
      this.globalService.gotoTargetList(TargetListParamType.entry_name, {
        entryName: this.targetKeyword.toUpperCase()
      });
    } else if (this.targetSelectedType === 'Gene name') {
      this.globalService.gotoTargetList(TargetListParamType.gene_name, {
        geneName: this.targetKeyword.toUpperCase()
      });
    } else if (this.targetSelectedType === 'ChEMBL ID') {
      this.globalService.gotoTargetList(TargetListParamType.chembl_id, {
        chemblId: this.targetKeyword.toUpperCase()
      });
    }
  }

  pathwaySearchTypeChange(selectedType: string) {
    this.pathwayKeyword = this.pathwaySearchTypeList.find(el => el.inputType === selectedType).value;
  }

  pathwaySubmit() {
    this.pathwayKeyword = this.pathwayKeyword.trim();
    if (this.pathwaySelectedType === 'Pathway ID') {
      this.globalService.gotoPathwayList(PathwayListParamType.pathway_id, {
        pathwayId: this.pathwayKeyword
      })
    } else if (this.pathwaySelectedType === 'Pathway name') {
      this.globalService.gotoPathwayList(PathwayListParamType.pathway_name, {
        pathwayName: this.pathwayKeyword
      })
    }
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
