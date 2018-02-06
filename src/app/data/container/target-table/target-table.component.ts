import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {Router} from '@angular/router';
import {PageMeta} from '../../../models/page-meta';
import {MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Target} from '../../../models/target';
import {GlobalService} from '../../../service/global/global.service';
import {DrugListParamsType} from '../../../enum/drug-list-param-type.enum';
import {Molecule} from '../../../models/molecule';
import {PathwayListParamType} from '../../../enum/pathway-list-param-type.enum';


@Component({
  selector: 'app-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.css']
})

export class TargetTableComponent implements OnInit {
  pageMeta: PageMeta | null;
  dataSource = new MatTableDataSource();
  targets: Target[];
  molecules: Molecule[];
  restUrl: string;
  @Input() tableTitle = '';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 20, 50, 100];
  @Input() displayedColumns = [];
  @Input() restUrl$: Observable<string>
  allColumns = ['chembl_id', 'target_name', 'kegg', 'uniprot_accession', 'entry_name',
    'gene',  'drugs', 'pathways',
    // 'pdbid', 'detail', 'type',
    'compounds', 'bioactivities', 'references'
  ];
  constructor(private rest: RestService,
              private router: Router,
              private globaService: GlobalService) { }

  ngOnInit() {
    console.log('target table init');
    this._getTargets(0, this.pageSize);
  }

  private _getTargets(page?, perPage?) {
    this.restUrl$.subscribe(data => this.restUrl = data);
    this.rest.getDataList(this.restUrl, page, perPage)
      .subscribe(data => {
        this.targets = data['targets'];
        this.dataSource.data = this.targets;
        this.pageMeta = data['meta']
      })
  }

  // getCompound(targetId: any): number {
  //   const molecules = this.targets.find(el => el.id === targetId).chembl_small_molecules_all_infos;
  //   if (molecules.length !== 0) {
  //     this.molecules = molecules;
  //     const compounds = [this.molecules[0]];
  //
  //     for (let i = 0, j = this.molecules.length - 1; i < j; i++) {
  //       if (this.molecules[i].molecule_chembl_id !== compounds[compounds.length - 1].molecule_chembl_id) {
  //         compounds.push(this.molecules[i])
  //       }
  //     }
  //     return compounds.length
  //   }
  //   return 0
  // }

  getReferences(targetId: any): number {
    const molecules = this.targets.find(el => el.id === targetId).chembl_small_molecules_all_infos;
    if (molecules.length !== 0) {
      // 依据doc_chembl_id 的不同去重
      const temp = {};
      for (let i = 0, j = molecules.length; i < j; i++) {
        const tmp = molecules[i].doc_chembl_id;
        if (!temp.hasOwnProperty(tmp)) {  // hasOwnProperty用来判断一个对象是否有你给出名称的属性或对象
          temp[molecules[i].doc_chembl_id] = 'yes'
        }
      }
      let len = 0;
      const tempArr = [];
      for (const i in temp) { // 迭代出对象的key值
        tempArr[len++] = i;
        ;
      }
      return tempArr.length;
    }
    return 0
  }

  pageChange(event) {
    console.log('event', event);
    this._getTargets(event.pageIndex, event.pageSize);
  }

  goDrugList(targetId: string | number) {
    this.globaService.gotoDrugList(DrugListParamsType.target_drug, {
      target_id: targetId
    })
  }

  goPathwayList(targetId: number | string) {
    this.globaService.gotoPathwayList(PathwayListParamType.target_id, {
      targetId: targetId
    })
  }

  goTargetDetail(chemblid: string) {
    this.router.navigate(['target', chemblid] )
  }

  goMoleculeList(targetId: string, targetName?: string) {
    this.router.navigate(['molecule'], {queryParams: {
      targetId: targetId,
      targetName: targetName
    }})
  }
}
