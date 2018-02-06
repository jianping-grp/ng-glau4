import {Component, Inject, OnInit} from '@angular/core';
import {Molecule} from '../../../models/molecule';
import {RestService} from '../../../service/rest/rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-doc-card',
  templateUrl: './doc-card.component.html',
  styleUrls: ['./doc-card.component.css']
})

export class DocCardComponent implements OnInit {
  molecule: Molecule | null;
  constructor(public dialogRef: MatDialogRef<DocCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rest: RestService,
              ) { }

  ngOnInit() {
    console.log('doc detail init');
    this.rest.getData(`target-related-mol-chembl/?filter{id}=${this.data.moleculeId}`)
      .subscribe(data => {
        this.molecule = data['ch_embl_small_molecule_all_infos'][0];
      })
  }

}
