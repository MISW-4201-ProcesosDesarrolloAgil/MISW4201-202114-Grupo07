import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancionCommentEditComponent } from './cancion-comment-edit.component';

describe('CancionCommentEditComponent', () => {
  let component: CancionCommentEditComponent;
  let fixture: ComponentFixture<CancionCommentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancionCommentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancionCommentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
