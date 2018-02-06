import {Target} from './target';

export class MoleculeStructure {
  constructor(public target_set?: Target[],
              public psa?: string,
              public mol_weight?: string,
              public alogp?: string,
              public mol?: string,
              public hbd?: string,
              public rtb?: string,
              public hba?: string,
              public formula?: string,
              public id?: number,
              public molecule_chembl_id?: string,
              public molecule_chembl_id_url?: string,
              public molecule_smile?: string) { }
}
