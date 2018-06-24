import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PageMeta} from '../../../glaucoma/models/page-meta';
import {Drug} from '../../../glaucoma/models/drug';
import {MatTableDataSource} from '@angular/material';
import {GlobalService} from '../../../service/global/global.service';
import {TargetListParamType} from '../../../glaucoma/enum/target-list-param-type.enum';
import {MoleculeStructure} from '../../../glaucoma/models/molecule-structure';
import {Subscription} from "rxjs/Subscription";
import {DrugbankId} from '../../../glaucoma/models/drugbank-id';

@Component({
  selector: 'app-molecule-drug',
  templateUrl: './molecule-drug.component.html',
  styleUrls: ['./molecule-drug.component.css']
})

export class MoleculeDrugComponent implements OnInit, OnDestroy {
  smiles: string;
  body: object;
  structureType: string;
  drugPageMeta: PageMeta | null;
  moleculePageMeta: PageMeta | null;
  drugForTargetPageMeta: PageMeta | null;
  molecules: MoleculeStructure[] | null;
  moleculesDataSource = new MatTableDataSource();
  drugs: Drug[] | null;
  drugsIsEmpty = false;
  drugForTargetsIsEmpty = false;
  tableTitle = '';
  drugForTargets: DrugbankId[] | null;
  moleculesIsEmpty = false;
  moleculeSubscription: Subscription;
  drugSubscription: Subscription;
  drugForTargetSubscription: Subscription;
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

  ngOnDestroy() {
    this.drugSubscription.unsubscribe();
    this.moleculeSubscription.unsubscribe();
    this.drugForTargetSubscription.unsubscribe()
  }

  private _postMoleculeDrug() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.structureType = params.get('structureType');
      this.smiles = params.get('smiles');
      if (this.structureType === 'substructure') {
        this.body = {smiles: this.smiles, similarity: 0, substructure_search: 1};
        this._postDrugs(0,8);
        this._postDrugForTarget(0, 8);
        this._postMolecules(0,5);
      } else if (this.structureType === 'structure') {
        const similarity = params.get('similarity');
        this.body = {smiles: this.smiles, similarity: similarity, substructure_search: 0};
        this._postDrugs(0,8);
        this._postDrugForTarget(0, 8);
        this._postMolecules(0,5);
      }
    })
  }

  private _postMolecules(page?, perPage?) {
   this.moleculeSubscription = this.rest.postDataList(
     `target-related-mol-structure/search/?${this.moleculeIncludeParams}`,
     this.body, page, perPage)
      .subscribe(data => {
          this.molecules = data['ch_embl_small_molecules'];
          this.moleculePageMeta = data['meta'];
          // 去掉重复的小分子结构
          this.moleculesDataSource.data = this.molecules;
        if (this.molecules === undefined) {
          this.moleculesIsEmpty = true;
        }
      })
  }

  private _postDrugs(page?, perPage?) {
   this.drugSubscription = this.rest.postDataList(`drugs/search/?${this.drugIncludeParams}`, this.body, page, perPage)
      .subscribe(data => {
          this.drugs = data['drugs'];
          this.drugPageMeta = data['meta'];
        if (this.drugs === undefined) {
          this.drugsIsEmpty = true;
        }
      })
  }

  private _postDrugForTarget(page?, perPage?) {
    this.drugForTargetSubscription = this.rest.postDataList(`drugbankid/search/?`, this.body, page, perPage)
      .subscribe(data => {
        this.drugForTargets = data['drug_bank_ids'];
        this.drugForTargetPageMeta = data['meta'];
        if (this.drugForTargets === undefined) {
          this.drugForTargetsIsEmpty = true;
        }
      })
  }

  gotoDrugDetail(id: number | string) {
    this.router.navigate(['/drug-glau-treatment', id])
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

  drugForTargetPageChange(event) {
    this._postDrugForTarget(event.pageIndex, event.pageSize)
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
//           .subscribe(layout => {
//               this.molecules = layout['ch_embl_small_molecules'];
//               this.moleculePageMeta = layout['meta'];
//               this.moleculesDataSource.layout = this.molecules;
//               // if layout is empty, no display
//               // if (layout.length === 0) {
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
//           .subscribe(layout => {
//               this.molecules = layout['ch_embl_small_molecules'];
//               this.moleculesDataSource.layout = this.molecules;
//               this.moleculePageMeta = layout['meta'];
//               if (layout.length === 0) {
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

