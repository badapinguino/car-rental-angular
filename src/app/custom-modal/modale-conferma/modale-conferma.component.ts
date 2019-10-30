import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modale-conferma',
  templateUrl: './modale-conferma.component.html',
  styleUrls: ['./modale-conferma.component.css']
})
export class ModaleConfermaComponent implements OnInit {

  // @ViewChild('modaleConferma', {static: false}) private modaleConfermaEliminazione: TemplateRef<Object>;

  constructor( private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}
