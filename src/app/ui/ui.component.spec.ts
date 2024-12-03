import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiComponent } from './ui.component';
import { GridService } from '../grid.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UiComponent', () => {
  let component: UiComponent;
  let service: GridService;
  let fixture: ComponentFixture<UiComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UiComponent, GridService],
    });
    service = TestBed.inject(GridService);
    fixture = TestBed.createComponent(UiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
