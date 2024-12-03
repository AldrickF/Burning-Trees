import { NgFor, NgIf  } from '@angular/common';
import { Component } from '@angular/core';
import { GridService } from '../grid.service';
import { Grid } from '../grid';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  constructor(protected gridService : GridService) { 
  }

  grid! : Grid;

  // Constants for each possible cell states
  readonly GRID_TREE = 0;
  readonly GRID_FIRE = 1;
  readonly GRID_ASHE = 2;

  // Cell colors depending on states
  readonly GRID_COLORS = [
    "#BBE8B5",
    "#EB9DA2",
    "#F3F9FE",
  ];

  ngOnInit() : void {
    this.gridService.gridObservable.subscribe( (grid) => {
      this.grid = grid;
    });
  }

  /**
   * Set the next state for the given cell when clicked on it
   */
  changeCellState(x: number, y: number) : void {
    this.gridService.changeCellState(x, y);
  }

  /**
   * Return associated cell color based on the current state 
   */
  getCellColor(x: number, y: number) : string {
    return this.GRID_COLORS[this.grid.cells[x][y]];
  }

}