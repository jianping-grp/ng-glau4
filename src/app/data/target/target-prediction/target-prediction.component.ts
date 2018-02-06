import {Component, OnInit} from "@angular/core";
import {RestService} from "../../../service/rest/rest.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TargetPkl} from "../../../models/target-pkl";
import {GlobalService} from "../../../service/global/global.service";

@Component({
  templateUrl: './target-prediction.component.html',
  styleUrls: ['./target-prediction.component.css'],
})

export class TargetPredictionComponent implements OnInit {
  targetPkls: TargetPkl[];
  includeParam = '';
  loadingStatus: boolean;
  isEmpty= false;

  constructor(private rest: RestService,
              private globalService: GlobalService,
              private route: ActivatedRoute,
              private router: Router) {
   this.globalService.loadingStatus$
     .subscribe( status => this.loadingStatus = status)
  }

  ngOnInit() {
    console.log('target-prediction init')
    this._postTargetPrediction();
  }

  goTargetDetail(chemblid: string) {
    this.router.navigate(['target', chemblid] )
  }

  private _postTargetPrediction(): void {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
      this.rest.postTargetPrediction(params.get('smiles'), this.includeParam)
        .subscribe(data => {
          console.log('total data:', data)
          // data include one or more targets
        this.targetPkls = data;

         // if targets is non-data, no display;
          if (this.targetPkls.length === 0) {
            this.isEmpty = true;
          }
        },
          error => {},
          () => {})
      })
  }

}
