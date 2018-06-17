import {Component, OnInit} from "@angular/core";
import {RestService} from "../../../service/rest/rest.service";

@Component({
  selector: 'app-chemical-screening',
  templateUrl: './chemical-screening.component.html',
  styleUrls: ['./chemical-screening.component.css']
})

export class ChemicalScreeningComponent implements OnInit {
  sdfFiles: File;
  constructor(private rest: RestService) {

  }

  ngOnInit() {

  }

  fileChange(event, dFile?: File) {
    let files = event.files;
    let reader = new FileReader();
    console.log(event, dFile);
    reader.readAsDataURL(dFile[0]);
    reader.onload = function (ev) {
      alert('文件读取完成');
      let sdf = ev.target;
      console.log(sdf);
    }
  }
}
