import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GridService } from './grid.service';
import { Grid } from './grid';
import { skip, take } from 'rxjs';

describe('GridService', () => {
  let service: GridService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GridService],
    });
    service = TestBed.inject(GridService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Test service setGridSize
   */
  it('should update gridSource from setGridSize', (done) => {
    var rows = 3;
    var cols = 8;
    const mockGrid: Grid = {
      rows: rows,
      cols: cols,
      cells: Array.from({ length : rows}, () => Array.from({ length : cols }, () => 0)),
      fireSpread: 0.5,
      isPlaying: false,
    };

    service.gridObservable.subscribe((grid) => {
      expect(grid).toEqual(mockGrid);
      done();
    });

    service.setGridSize(mockGrid.rows, mockGrid.cols);

    const req = httpMock.expectOne('/api/controller.php');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      action: 'setGridSize',
      width: mockGrid.rows,
      height: mockGrid.cols,
    });

    req.flush(mockGrid);
  });

  /**
   * Test service setFireSpreadRate
   */
  it('should update gridSource from setFireSpreadRate', (done) => {
    var rows = 1;
    var cols = 1;
    const mockGrid: Grid = {
      rows: rows,
      cols: cols,
      cells: Array.from({ length : rows}, () => Array.from({ length : cols }, () => 0)),
      fireSpread: 1,
      isPlaying: false,
    };

    service.gridObservable.subscribe((grid) => {
      expect(grid).toEqual(mockGrid);
      done();
    });

    service.setFireSpreadRate(mockGrid.fireSpread);

    const req = httpMock.expectOne('/api/controller.php');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      action: 'setFireSpreadRate',
      fireSpread: mockGrid.fireSpread
    });

    req.flush(mockGrid);
  });
});
