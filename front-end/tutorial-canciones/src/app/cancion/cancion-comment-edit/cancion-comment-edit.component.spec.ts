import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancionCommentEditComponent } from './cancion-comment-edit.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

describe('CancionCommentEditComponent', () => {
  let component: CancionCommentEditComponent;
  let fixture: ComponentFixture<CancionCommentEditComponent>;
  let debug: DebugElement;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule, FormsModule, ToastrModule.forRoot(), RouterTestingModule],

      declarations: [ CancionCommentEditComponent ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder }
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancionCommentEditComponent);
    component = fixture.componentInstance;
    component.cancionCommentForm = formBuilder.group({
      comentario: null
    })
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
