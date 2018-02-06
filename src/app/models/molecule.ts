import {Target} from './target';

export class Molecule {
  constructor(
    public doc_doi?: string,
    public doc_pubmed_id?: string,
    public molecule_chembl_id_url?: string,
    public activity_standard_value?: string,
    public doc_pubmed_id_url?: string,
    public activity_standard_units?: string,
    public assay_chembl_id_url?: string,
    public assay_assay_id?: string,
    public id?: number,
    public doc_chembl_id?: string,
    public molecule_smile?: string,
    public assay_chembl_id?: string,
    public activity_pchembl_value?: string,
    public activity_standard_type?: string,
    public docs_title?: string,
    public activity_doc_id?: string,
    public molecule_chembl_id?: string,
    public doc_chembl_id_url?: string,
    public activity_assay_id?: string,
    public assay_description?: string,
    public target_set?: Target[],
    public psa?: string,
    public mol_weight?: string,
    public alogp?: string,
    public mol?: string,
    public hbd?: string,
    public rtb?: string,
    public hba?: string,
    public formula?: string
  ) { }
}
