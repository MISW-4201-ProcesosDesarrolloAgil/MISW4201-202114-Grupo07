/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { CancionService } from './cancion.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';

describe('Service: Cancion', () => {
  let injector: TestBed;
  let service: CancionService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CancionService]
    });
    injector = getTestBed();
    service = injector.get(CancionService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should ...', inject([CancionService], (service: CancionService) => {
    expect(service).toBeTruthy();
  }));
});
