/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlbumShareComponent } from './album-share.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { Usuario } from 'src/app/usuario/usuario';

describe('AlbumShareComponent', () => {
  let component: AlbumShareComponent;
  let fixture: ComponentFixture<AlbumShareComponent>;
  let debug: DebugElement;
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule,
        FormsModule, ToastrModule.forRoot(), RouterTestingModule],
      declarations: [AlbumShareComponent],
      providers: [

        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumShareComponent);
    component = fixture.componentInstance;
    component.shareForm = formBuilder.group({
      nombre: Usuario
    });
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
