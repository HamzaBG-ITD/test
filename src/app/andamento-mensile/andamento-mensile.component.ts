import { Component, OnInit } from '@angular/core';
import { Data } from '../interfaces/data';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-andamento-mensile',
  templateUrl: './andamento-mensile.component.html',
  styleUrls: ['./andamento-mensile.component.css']
})
export class AndamentoMensileComponent implements OnInit {

  Data: Array<{ documenti: number, importo: number }> = [];
  months: any = { 0: 'Gennaio', 1: 'Febbraio', 2: 'Marzo', 3: 'Aprile	', 4: 'Maggio', 5: 'Giugno', 6: 'Luglio', 7: 'Agosto', 8: 'Settembre', 9: 'Ottobre', 10: 'Novembre', 11: 'Dicembre' };
  selectedData: Array<{ id: number, importo: number, month: string }> = [];
  isMouseDown: boolean = false;
  repeatMouseDown: boolean = false;
  deleteAccept:boolean=false;
  maxItem: number = 0;

  constructor(public service: ServiceService) {}

  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    var dt: any = [];
    this.service.getData()
      .subscribe((resp: Data[]) => {
        dt = resp;
        this.Data = dt.mesi;
        this.getMaxImports()
      });
  }

  getMaxImports() {
    this.maxItem = Math.max(...this.Data.map(o => o.importo));
  }

  getProgressValue(item: number) {
    var result = (item / this.maxItem) * 100;
    return result + '%'
  }

  getOrder(){
    this.selectedData.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
  }

  mousedown(doc: number, month: string, importo: number) {
    if (this.repeatMouseDown == true) {
      this.selectedData = [];
    }
    this.isMouseDown = true;
    let exist$ = this.selectedData.filter(x => {
      return x.id == doc
    });
    if (exist$.length == 0) {
      this.selectedData.push({ id: doc, importo: importo, month: month });
      this.getOrder();
    }
    return false;
  }

  mouseover(doc: number, month: string, importo: number) {
    if (this.isMouseDown == true) {
      let exist$ = this.selectedData.filter(x => {
        return x.id == doc
      });
      if (exist$.length == 0) {
        this.selectedData.push({ id: doc, importo: importo, month: month });
        this.getOrder();
      }
    }
    this.repeatMouseDown = true;
  }

  mouseUp(){
    this.isMouseDown = false;
  }

  selectAll(){
    for (let index = 0; index < this.Data.length; index++) {
      let exist$ = this.selectedData.filter(x => {
        return x.id == index
      });
      if (exist$.length == 0) {
        this.selectedData.push({ id: index, importo: this.Data[index].importo, month: this.months[index] });
        this.getOrder();
      }
    }
    this.deleteAccept=true;
  }
  
  deleteAll(){
    this.selectedData=[];
    this.deleteAccept=false;
  }

  checkifSelected(item: number) {
    var n$ = this.selectedData?.filter(x =>
      x.id == item
    )
    return n$[0] != undefined ? true : false
  }


}
