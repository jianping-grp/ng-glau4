import {Component, ElementRef, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Target} from '../../../glaucoma/models/target';
import {FileUploader} from 'ng2-file-upload';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-chemical-screening',
  templateUrl: './chemical-screening.component.html',
  styleUrls: ['./chemical-screening.component.css']
})

export class ChemicalScreeningComponent implements OnInit {
  targets: Target[] = [];
  inputFile: File;
  chemicalScreeningForm: FormGroup;
  constructor(private rest: RestService,
              private el: ElementRef) {
  }


  public uploder: FileUploader = new FileUploader({
    url: `${environment.REST_HOST}/bulk-target-prediction/`,
    method: "POST",
    itemAlias: "structure_file"
  });



  ngOnInit() {
    this.createForm();
    this._getTargetName();
  }

  private _getTargetName() {
    this.rest.getDataList(`target/?exclude[]=*&include[]=protein_description&sort[]=protein_description`, 0, 999999)
      .subscribe(data => {
        this.targets = data['targets'];
        this.targets.unshift({protein_description: 'All'});
        console.log(this.targets.length, this.targets)
      })
  }

  createForm() {
    this.chemicalScreeningForm = new FormGroup({
      queryFile: new FormControl('',),
      email: new FormControl('', [Validators.required, Validators.email]),
      targetName: new FormControl('All', Validators.required)
    })
  }

  get queryFile() {
    return this.chemicalScreeningForm.get('queryFile');
  }

  get email() {
    return this.chemicalScreeningForm.get('email');
  }

  get targetName() {
    return this.chemicalScreeningForm.get('targetName');
  }

  fileChange(event: any) {
    this.inputFile = event.target.files[0];
    const form = this.chemicalScreeningForm.value;
    const email = form.email;
    this.uploder.setOptions({additionalParameter:{'email_addr': email}});
    console.log(this.uploder);
  }

  onSubmit() {
    const form = this.chemicalScreeningForm.value;
    let reader = new FileReader();
    // console.log(event, file, 'file');
    reader.readAsText(this.inputFile, 'UTF-8');
    let readerSdf = reader.onload = function (ev) {
      var inputFiles = ev.target;
      alert('文件读取完成');
      let sdf = ev.target;
      console.log(sdf);
      return sdf
    };
    const body = {
      structure_file: readerSdf,
      email_addr: form.email
    };
    this.rest.postChemicalScreening(body);
    console.log('body', body);
    this.rebuildForm();
  }

  rebuildForm() {
    this.chemicalScreeningForm.reset({
      targetName: 'All',
    })
  }


  uploderFile() {
    this.uploder.queue[0].onSuccess = function (response, status, headers) {
      if (status == 200) {
        let temRes = JSON.parse(response);
        console.log('response',temRes);
        alert('成功');
      } else {
        alert('失败')
      }
    }
    this.uploder.queue[0].upload();
  }
}




// if (!this.inputFile) {
//   alert('Please submit Tripos mol2 or MDL sdf file!');
// } else if (this.inputFile) {
//   const a = this.inputFile.name.indexOf('.sdf'); // 无值为-1.存在值最小为1
//   const b = this.inputFile.name.indexOf('.mol2');
//   if (a + b < 0) {
//     alert('Please submit Tripos mol2 or MDL sdf file!')
//   } else {
