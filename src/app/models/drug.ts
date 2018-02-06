import {Target} from './target';
import {Pathway} from './pathway';

export class Drug {
  constructor(
    public smiles?: string,
    public drugbank_id?: string,
    public IUPAC?: string,
    public rtb?: number,
    public psa?: string,
    public mol_file?: string,
    public drug_name?: string,
    public mol_image?: string,
    public mol_weight?: string,
    public alogp?: string,
    public id?: number,
    public drugbank_url?: string,
    public cid?: string,
    public cas?: string,
    public hbd?: number,
    public first_created?: string,
    public hba?: number,
    public last_modified?: string,
    public drug_state?: string,
    public formula?: string,
    public pathway_set?: Pathway[],
    public targets?: Target[]
  ) { }
}
