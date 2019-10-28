import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestApiRequests} from '../../services/rest-api-requests';
import {CustomButtonProperties} from '../../_template/custom-button-properties';
import {RestApi} from '../../services/rest-api.enum';
import {Router} from '@angular/router';

// import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {

  @Input() buttonProperties: CustomButtonProperties;
  @Input() id?: any;
  @Input() nomeCampoId?: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onClick() {
    if (this.buttonProperties.url != null && this.nomeCampoId != null && this.id != null) {
      this.router.navigate([this.buttonProperties.url], {queryParams: {[this.nomeCampoId]: this.id}});
    } else if ((this.buttonProperties.url != null || this.buttonProperties.url !== undefined)) {
      this.router.navigate([this.buttonProperties.url]);
    }
  }
}
