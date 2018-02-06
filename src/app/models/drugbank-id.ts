import {Target} from './target';

export class DrugbankId {
  constructor(
    public url?: string,
    public drugbank_id?: string,
    public id?: string,
    public target_set?: Target[]
  ) { }
}
