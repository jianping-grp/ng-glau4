import {Drug} from './drug';
import {Pathway} from './pathway';
import {DrugbankId} from './drugbank-id';
import {Molecule} from './molecule';
import {MoleculeStructure} from './molecule-structure';

export class Target {
  constructor(
    public chemblid?: string,
    public chembl_url?: string,
    public kegg_url?: string,
    public uniprot_accession?: string,
    public keggid?: string,
    public entry_name?: string,
    public protein_description?: string,
    public pdbid?: string,
    public gene?: string,
    public type?: string,
    public id?: number,
    public drug_set?: Drug[],
    public pathway_set?: Pathway[],
    public drugbankids?: DrugbankId[],
    public chembl_small_molecules_all_infos?: Molecule[],
    public chembl_small_molecules_structure_info?: MoleculeStructure[],
  ) { }
}
