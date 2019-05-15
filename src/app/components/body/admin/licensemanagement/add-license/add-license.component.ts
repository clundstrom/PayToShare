import {Component, OnInit} from '@angular/core';
import {Tag} from '../../../../../models/products/tag';
import {Format} from '../../../../../models/products/format';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TagService} from '../../../../../services/product/tag.service';
import {FormatService} from '../../../../../services/product/format.service';
import {LicenseService} from '../../../../../services/product/license.service';
import {FormControl, FormGroup} from '@angular/forms';
import {License} from '../../../../../models/products/license';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Component({
  selector: 'app-add-license',
  templateUrl: './add-license.component.html',
  styleUrls: ['./add-license.component.scss']
})
export class AddLicenseComponent implements OnInit {

  private tags: Tag[];
  private formats: Format[];

  newLicenseForm = new FormGroup({
    licenseName: new FormControl(''),
    format: new FormControl(''),
    tag: new FormControl(''),

  });

  constructor(private licenseService: LicenseService,
              private modalService: NgbModal,
              private tagService: TagService,
              private formatService: FormatService) {
  }

  ngOnInit() {
    this.formatService.getFormats().subscribe(formats => this.formats = formats);
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }

  addLicense() {
    const rawFormat = this.newLicenseForm.controls.format.value;
    const rawTag = this.newLicenseForm.controls.tag.value;

    const format: Format = JSON.parse(rawFormat);
    const tag: Tag = JSON.parse(rawTag);

    const license = new License();
    license.name = this.newLicenseForm.controls.licenseName.value;
    license.format = format;
    license.tag = tag;

    this.licenseService.addLicense(license);
    this.modalService.dismissAll();
  }

  openCenteredDialog(addLicenseModal) {
    this.modalService.open(addLicenseModal, {centered: true});
    return false;
  }
}
