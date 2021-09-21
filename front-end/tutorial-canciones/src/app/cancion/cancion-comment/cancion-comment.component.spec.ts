import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancionCommentComponent } from './cancion-comment.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

describe('CancionCommentComponent', () => {
  let component: CancionCommentComponent;
  let fixture: ComponentFixture<CancionCommentComponent>;
  let debug: DebugElement;
  const  formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule, FormsModule, ToastrModule.forRoot(), RouterTestingModule],

      declarations: [ CancionCommentComponent ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancionCommentComponent);
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
