import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/usuario';
import { Album } from '../album';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-album-share',
  templateUrl: './album-share.component.html',
  styleUrls: ['./album-share.component.css'],

  providers: [NgbModalConfig, NgbModal]
})
export class AlbumShareComponent implements OnInit {
  album: Album
  shareForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.shareForm = this.formBuilder.group({
      nombre:["",[Validators.required, Validators.minLength(5)]]
    })
  }
}
