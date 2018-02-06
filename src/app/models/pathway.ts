import {Drug} from './drug';
import {Target} from './target';

export class Pathway {
  constructor(
    public url?: string,
    public descripor?: string,
    public pathway_name?: string,
    public id?: number,
    public drugs?: Drug[],
    public targets?: Target[],
  ) { }
}
