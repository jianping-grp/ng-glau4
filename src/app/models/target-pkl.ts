export class TargetPkl {
  constructor(
    public chembl_id?: string,
    public topological_hashed?: number,
    public atompair_hashed?: number,
    public maccs?: number,
    public morgan_hashed?: number,
  ) { }
}
