import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCommentEditComponent } from './album-comment-edit.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

describe('AlbumCommentEditComponent', () => {
  let component: AlbumCommentEditComponent;
  let fixture: ComponentFixture<AlbumCommentEditComponent>;
  let debug: DebugElement;
  const formBuilder: FormBuilder = new FormBuilder();

  // albumCommentForm

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule,
        FormsModule, ToastrModule.forRoot(), RouterTestingModule],
      declarations: [ AlbumCommentEditComponent ],
      providers: [

        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCommentEditComponent);
    component = fixture.componentInstance;
    component.albumCommentForm = formBuilder.group({
      comentario: null
    });
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
