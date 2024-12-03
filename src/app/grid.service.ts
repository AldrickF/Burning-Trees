import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Grid } from './grid';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private apiUrl = '/api/controller.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private gridSource = new Subject<Grid>();
  gridObservable = this.gridSource.asObservable();
  
  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Notify all component registered to gridSource that grid has changed
   */
  updateGridData(grid : Grid) : void {
    this.gridSource.next( grid );
  }

  /**
   * Return the object grid from server
   */
  getGrid() : void {
    var body = { action: "getGrid" }; 
    this.http.post<Grid>(this.apiUrl, body, this.httpOptions).subscribe({ 
      next : (grid: Grid) => {
        this.updateGridData(grid);
      }, 
      error : (err) => {
        console.log(err);
      }
    });
  }

  /**
   * Set grid size
   * This will set the current grid back to default
   */
  setGridSize(width: number, height: number) : void {
    var body = { action: "setGridSize", width: width, height: height }; 
    this.http.post<Grid>(this.apiUrl, body, this.httpOptions).subscribe({ 
      next : (grid: Grid) => {
        this.updateGridData(grid);
      }, 
      error : (err) => {
        console.log(err);
      }
    });
  }

  /**
   * Set fire spread rate when the game is playing
   */
  setFireSpreadRate(fireSpread: number) : void {
    var body = { action: "setFireSpreadRate", fireSpread: fireSpread}; 
    this.http.post<Grid>(this.apiUrl, body, this.httpOptions).subscribe({ 
      next : (grid: Grid) => {
        this.updateGridData(grid);
      }, 
      error : (err) => {
        console.log(err);
      }
    });
  }

  /**
   * Set all cell states back to default
   */
  clearGrid() : void {
    var body = {action: "clearGrid"}; 
    this.http.post<Grid>(this.apiUrl, body, this.httpOptions).subscribe({ 
      next : (grid: Grid) => {
        this.updateGridData(grid);
      }, 
      error : (err) => {
        console.log(err);
      }
    });
  }

  /**
   * Randomize fire on each cells
   */
  setRandomFireCells(fireChance: number) : void {
    var body = { action: "setRandomFireCells", fireChance: fireChance}; 
    this.http.post<Grid>(this.apiUrl, body, this.httpOptions).subscribe({ 
      next : (grid: Grid) => {
        this.updateGridData(grid);
      }, 
      error : (err) => {
        console.log(err);
      }
    });
  }

  /**
   * Set a specific cell to the next state
   */
  changeCellState(x: number, y: number) : void {
    var body = { action: "changeCellState", x: x, y: y}; 
    this.http.post<Grid>(this.apiUrl, body, this.httpOptions).subscribe({ 
      next : (grid: Grid) => {
        this.updateGridData(grid);
      }, 
      error : (err) => {
        console.log(err);
      }
    });
  }

  /**
   * Start or stop the fire propagation
   */
  setPlayMode(isPlaying : boolean) : void {
    var body = {action: "setPlayMode", isPlaying: isPlaying}; 
    this.http.post<Grid>(this.apiUrl, body, this.httpOptions).subscribe({ 
      next : (grid: Grid) => {
        this.updateGridData(grid);
      }, 
      error : (err) => {
        console.log(err);
      }
    });
  }

  /**
   * getGridNextStep
   */
  getGridNextStep() : void {
    var body = {action: "getGridNextStep"}; 
    this.http.post<Grid>(this.apiUrl, body, this.httpOptions).subscribe({ 
      next : (grid: Grid) => {
        this.updateGridData(grid);
      }, 
      error : (err) => {
        console.log(err);
      }
    });
  }
}
