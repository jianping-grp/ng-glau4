import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {GlobalService} from "../global/global.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';
import {environment} from 'environments/environment';
@Injectable()
export class RestService {

  private PER_PAGE = 10;
  private REST_HOST = environment.REST_HOST;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {
    console.log(`rest host: ${this.REST_HOST}`);

  }

  public getData(url: string): Observable<any> {
    this.globalService.setLoading(true);
    return this.http.get(`${this.REST_HOST}/${url}`)
    .finally(() => this.globalService.setLoading(false))
      .catch(this.handleError)
  }

  public getDataList(url: string,
                     page = 0,
                     perPage = this.PER_PAGE,
                     sortby = '',
                     extraParam = ''): Observable<any> {
    // page + 1, as mat-paginator is 0-base while DRF is 1-base
    page = +(page) + 1;
    // set global loadingStatus to true
    this.globalService.setLoading(true);
    let sortParam = '';
    if (sortby !== '') {
      sortParam = `&sort[]=${sortby}`;
    }
    return this.http.get(`${this.REST_HOST}/${url}${extraParam}&page=${page}&per_page=${perPage}${sortParam}`)
      .finally(() => {this.globalService.setLoading(false)})
      .catch(this.handleError)
  }


  // todo delete
  private fetchData(url: string, includeParams = ''): any {
    this.globalService.setLoading(true);
    return this.http.get(`${this.REST_HOST}/${url}/${includeParams}`)
      .finally(() => this.globalService.setLoading(false))
  }

  private fetchDataList(url: string, includeParam = '', page = 0, perPage=this.PER_PAGE){
    page = +(page) + 1;
    this.globalService.setLoading(true);
    return this.http.get(`${this.REST_HOST}/${url}${includeParam}&page=${page}&per_page=${perPage}`)
      .finally(() => this.globalService.setLoading(false)); // stop loading when finished or an error occur
  }



  // search Structure by simialiarity
  postMoleculeByStructure(smiles: string, similarity: number, includeParam = '',
                          page = 0, perPage = this.PER_PAGE): Observable<any>{
    page = +(page) +1;
    const body = {smiles: smiles, similarity: similarity, substructure_search: 0};
    this.globalService.setLoading(true);
    console.log(body);
    return this.http.post(`${this.REST_HOST}/target-related-mol-structure/search/${includeParam}&page=${page}&per_page=${perPage}`, body)
      .finally(() => this.globalService.setLoading(false))
      .catch(this.handleError)
  }

  // search Substructure
  postMoleculeBySubstructure(smiles: string, includeParam = '',
                             page = 0, perPage = this.PER_PAGE): Observable<any> {
    page = +(page) + 1;
    const body = {smiles: smiles, similarity: 0, substructure_search: 1};
    this.globalService.setLoading(true);
    console.log(body);
    return this.http.post(`${this.REST_HOST}/target-related-mol-structure/search/${includeParam}&page=${page}&per_page=${perPage}`, body)
      .finally(() => this.globalService.setLoading(false))
      .catch(this.handleError);
  }

  postDataList(url: string, body: Object, page = 0, perPage = this.PER_PAGE, sortby = '', extraParam = ''): Observable<any> {
    page = +(page) + 1;
    let sortParam = '';
    if (sortby !== '') {
      sortParam = `&sort[]=${sortby}`;
    }
    this.globalService.setLoading(true);
    return this.http.post(`${this.REST_HOST}/${url}${extraParam}&page=${page}&per_page=${perPage}${sortParam}`, body)
      .finally(() => this.globalService.setLoading(false))
      .catch(this.handleError)
  }

  // target prediction
  postTargetPrediction(smiles: string, includeParam = ''): Observable<any> {
    const body = {smiles: smiles};
    this.globalService.setLoading(true);
    return this.http.post(`${this.REST_HOST}/target-prediction/${includeParam}`, body)
      .finally(() => this.globalService.setLoading(false))
      .catch(this.handleError);
  }

  // user feedback
  userFeedback(body: any) {
    this.globalService.setLoading(true);
    return this.http.post(`${this.REST_HOST}/feedback/`, body)
      .finally(() => this.globalService.setLoading(false))
      .catch(this.handleError)
  }

  //chemical-screening
  postChemicalScreening(body: any) {
    return this.http.post(`${this.REST_HOST}/bulk-target-prediction/`, body)
  }


  private handleError(error: HttpErrorResponse | any ) {
    let errMsg: string;
      if (error instanceof HttpErrorResponse) {
        this.globalService.setLoading(false);
        errMsg = `${error.status} - ${error.statusText || ''} ${error}`;

    } else {
        this.globalService.setLoading(false);
        errMsg = error.message ? error.message : error.toString();
    }

    console.log(errMsg);
    return Promise.reject(errMsg);
}
}

