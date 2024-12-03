import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { GridService } from '../grid.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GridComponent', () => {
  let service: GridService;
  let httpMock: HttpTestingController;
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GridComponent, GridService],
    });
    service = TestBed.inject(GridService);
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
