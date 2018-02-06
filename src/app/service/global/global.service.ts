import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DrugListParamsType} from '../../enum/drug-list-param-type.enum';
import {Router} from '@angular/router';
import {TargetListParamType} from '../../enum/target-list-param-type.enum';
import {PathwayListParamType} from '../../enum/pathway-list-param-type.enum';

@Injectable()
export class GlobalService {
  // global loading status
  constructor(private router: Router) { }
  private _globalLoading = new Subject<boolean>();
  loadingStatus$ = this._globalLoading.asObservable();

  setLoading(status: boolean): void {
    this._globalLoading.next(status)
  }

  gotoDrugList(paramsType: DrugListParamsType, params?: any) {
    const queryParams = {paramsType: paramsType};
    Object.assign(queryParams, params);
    this.router.navigate(['drug-glau-treatment'], {
      queryParams: queryParams
    });
  }

  gotoTargetList(paramsType: TargetListParamType, params?: any) {
    const queryParams = {paramsType: paramsType};
    Object.assign(queryParams, params);
    this.router.navigate(['target'], {
      queryParams: queryParams
    });
  }

  gotoPathwayList(paramsType: PathwayListParamType, params?: any) {
    const queryParams = {paramsType: paramsType};
    Object.assign(queryParams, params);
    this.router.navigate(['pathway'], {
      queryParams: queryParams
    });
  }
}
