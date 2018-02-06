import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PageMeta} from '../../../models/page-meta';
import {Drug} from '../../../models/drug';
import {MatTableDataSource} from '@angular/material';
import {GlobalService} from '../../../service/global/global.service';
import {TargetListParamType} from '../../../enum/target-list-param-type.enum';
import {MoleculeStructure} from '../../../models/molecule-structure';

@Component({
  selector: 'app-molecule-drug',
  templateUrl: './molecule-drug.component.html',
  styleUrls: ['./molecule-drug.component.css']
})

export class MoleculeDrugComponent implements OnInit {
  smiles: string;
  body: object;
  structureType: string;
  drugPageMeta: PageMeta | null;
  moleculePageMeta: PageMeta | null;
  molecules: MoleculeStructure[] | null;
  moleculesDataSource = new MatTableDataSource();
  drugs: Drug[] | null;
  drugsIsEmpty = false;
  tableTitle = '';
  moleculesIsEmpty = false;
  pageSizeOptions = [5, 10, 20, 50, 100];
  moleculeIncludeParams = '?sort[]=molecule_chembl_id' + '&exclude[]=target_set.*&include[]=target_set.id';
  drugIncludeParams = '&sort[]=id&exclude[]=pathway_set.*&exclude[]=targets.*';
  displayedColumns = ['chembl_id', 'formula', 'mol_weight', 'alogp', 'psa', 'rtb', 'hbd', 'hba', 'targets'];
  allColumns = ['chembl_id', 'formula', 'mol_weight', 'alogp', 'psa', 'rtb', 'hbd', 'hba', 'targets'];

  constructor(private rest: RestService,
              private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService) {
  }


  ngOnInit() {
    console.log('molecule drug init');
    this._postMoleculeDrug();
    // this.postMolecules();
  }

  private _postMoleculeDrug() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.structureType = params.get('structureType');
      this.smiles = params.get('smiles');
      if (this.structureType === 'substructure') {
        this.body = {smiles: this.smiles, similarity: 0, substructure_search: 1};
        this._postDrugs();
        this._postMolecules();
      } else if (this.structureType === 'structure') {
        const similarity = params.get('similarity');
        this.body = {smiles: this.smiles, similarity: similarity, substructure_search: 0};
        this._postDrugs();
        this._postMolecules();
      }
    })
  }

  private _postMolecules(page?, perPage?) {
    this.rest.postDataList(`target-related-mol-structure/search/?${this.moleculeIncludeParams}`, this.body, page, perPage)
      .subscribe(data => {
        if (data.length === 0) {
          this.moleculesIsEmpty = true;
        } else {
          this.molecules = data['ch_embl_small_molecules'];
          this.moleculePageMeta = data['meta'];
          // 去掉重复的小分子结构
          this.moleculesDataSource.data = this.molecules;
        }
      })
  }

  private _postDrugs(page?, perPage?) {
    this.rest.postDataList(`drugs/search/?${this.drugIncludeParams}`, this.body, page, perPage)
      .subscribe(data => {
        if (data.length === 0) {
          this.drugsIsEmpty = true;
        } else {
          this.drugs = data['drugs'];
          console.log('drugs', this.drugs);
          this.drugPageMeta = data['meta'];
        }
        ;
      })
  }

  gotoDrugDetail(id: number | string) {
    this.router.navigate(['/drug', id])
  }

  goTargetList(moleculeChemblId: string) {
    this.globalService.gotoTargetList(TargetListParamType.molecule_chembl_id, {
      moleculeChemblId: moleculeChemblId,
    })
  }

  drugPageChange(event) {
    this._postDrugs(event.pageIndex, event.pageSize)
  }

  moleculePageChange(event) {
    this._postMolecules(event.pageIndex, event.pageSize);
  }

}


// private postMolecules(page?, perPage?): void {
//   this.route.queryParamMap
//   .subscribe((params: ParamMap) => {
//     this.structureType = params.get('structureType');
//     this.smiles = params.get('smiles');
//     if (this.structureType) {
//       console.log(params.has('similes'));
//       if (this.structureType === 'structure') {
//         const similarity = +params.get('similarity');
//         this.rest.postMoleculeByStructure(this.smiles, similarity, this.moleculeIncludeParams, page, perPage)
//           .subscribe(data => {
//               this.molecules = data['ch_embl_small_molecules'];
//               this.moleculePageMeta = data['meta'];
//               this.moleculesDataSource.data = this.molecules;
//               // if data is empty, no display
//               // if (data.length === 0) {
//               //   this.moleculesIsEmpty = true;
//               // }
//
//             },
//             error => {
//             },
//             () => {
//             })
//       } else if (this.structureType === 'substructure') {
//         this.rest.postMoleculeBySubstructure(this.smiles, this.moleculeIncludeParams, page, perPage)
//           .subscribe(data => {
//               this.molecules = data['ch_embl_small_molecules'];
//               this.moleculesDataSource.data = this.molecules;
//               this.moleculePageMeta = data['meta'];
//               if (data.length === 0) {
//                 this.moleculesIsEmpty = true;
//               }
//             },
//             error => {
//             },
//             () => {
//             })
//       }
//     }
//   })
// }

