import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalService} from "../../../service/global/global.service";
import {JsmeComponent} from "../../../jsme/jsme/jsme.component";

@Component({
  selector: 'app-sea',
  templateUrl: './sea.component.html',
  styleUrls: ['./sea.component.css']
})
export class SeaComponent implements OnInit {
  @ViewChild(JsmeComponent) jsme: JsmeComponent;
  structure : string;
  constructor(private router: Router,
              private globalService: GlobalService) { }

  ngOnInit() {
  }

  goTargetPrediction(smiles: string) {
    this.router.navigate(['target/target-prediction'], {
      queryParams: {
        smiles: smiles
      }
    })
  }



}
