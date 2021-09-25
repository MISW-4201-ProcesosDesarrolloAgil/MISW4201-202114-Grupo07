import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCommentEditComponent } from './album-comment-edit.component';

describe('AlbumCommentEditComponent', () => {
  let component: AlbumCommentEditComponent;
  let fixture: ComponentFixture<AlbumCommentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumCommentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCommentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
