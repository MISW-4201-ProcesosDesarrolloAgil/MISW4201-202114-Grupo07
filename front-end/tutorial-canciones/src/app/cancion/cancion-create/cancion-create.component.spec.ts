/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CancionCreateComponent } from './cancion-create.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('CancionCreateComponent', () => {
  let component: CancionCreateComponent;
  let fixture: ComponentFixture<CancionCreateComponent>;
  let debug: DebugElement;
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule,
        FormsModule, ToastrModule.forRoot(), RouterTestingModule],
      declarations: [CancionCreateComponent],
      providers: [

        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancionCreateComponent);
    component = fixture.componentInstance;
    component.cancionForm = formBuilder.group({
      titulo: null,
      minutos: null,
      segundos: null,
      interprete: null
    });
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
