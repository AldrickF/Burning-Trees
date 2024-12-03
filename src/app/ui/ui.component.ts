import { Component, ElementRef, ViewChild } from '@angular/core';
import { GridService } from '../grid.service';
import { Grid } from '../grid';

@Component({
  selector: 'app-ui',
  standalone: true,
  imports: [],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.css'
})
export class UiComponent {
  
  grid! : Grid;

  @ViewChild('width', { static: false }) width!: ElementRef;
  @ViewChild('height', { static: false }) height!: ElementRef;
  @ViewChild('fireSpread', { static: false }) fireSpread!: ElementRef;
  @ViewChild('randomFireRate', { static: false }) randomFireRate!: ElementRef;
  @ViewChild('fireTicRate', { static: false }) fireTicRate!: ElementRef;
  @ViewChild('playButtonText', { static: false }) playButtonText!: ElementRef;
  
  playingTimeout : any;  // SetTimeout id
  isPlaying : boolean = false;    // Is fire spreading

  constructor(private gridService : GridService) { 
  }

  ngOnInit() : void {
  }

  /**
   * Load existing grid parameters
   */
  ngAfterViewInit() : void {

    // Update UI parameters and elements on grid update
    this.gridService.gridObservable.subscribe( (grid) => {
      
      this.grid = grid;
      this.width.nativeElement.value = grid.rows;
      this.height.nativeElement.value = grid.cols;
      this.fireSpread.nativeElement.value = grid.fireSpread;
      this.isPlaying = grid.isPlaying;

      // Adapt play button text
      if (this.isPlaying) {
        this.playButtonText.nativeElement.textContent = "Stop";
      } else {
        this.playButtonText.nativeElement.textContent = "Start";
      }

      // Check if the interval is still active
      // If yes, get the next grid step after the timer end
      if (this.isPlaying) {
        this.startPlayingTimeout();
      } else {
        this.stopPlayingTimeout();
      }
    });

    // Trigger grid update to load existing grid parameters
    this.gridService.getGrid();
  }

  /**
   * Stop the existing playing timeout
   */
  stopPlayingTimeout() : void {
    if (this.playingTimeout) {
      clearTimeout(this.playingTimeout);
      this.playingTimeout = null;
    }
  }

  /**
   * Start the playing interval
   */
  startPlayingTimeout() {
    this.stopPlayingTimeout();
    this.playingTimeout = setTimeout(() => {
      this.getGridNextStep();
    }, this.fireTicRate.nativeElement.value * 1000); // Secondes
  }

  /**
   * Set the remote grid size if existing, create a new one instead with the current size
   */
  setGridSize() : void {
    var width = this.width.nativeElement.value;
    var height = this.height.nativeElement.value;
    this.gridService.setGridSize(width, height);
  }

  /**
   *  Set the remote fire spread rate if existing, create a new one instead with the current size
   */
  setFireSpreadRate() : void {
    var fireSpread = this.fireSpread.nativeElement.value;
    this.gridService.setFireSpreadRate(fireSpread);
  }

  /**
   * Restore the grid with only trees
   */
  clearGrid() : void {
    this.gridService.clearGrid();
  }

  /**
   * Create fire cells randomly with fireChance rate
   */
  setRandomFireCells() : void {
    var fireChance = this.randomFireRate.nativeElement.value;
    this.gridService.setRandomFireCells(fireChance);
  }

  /**
   * Start or stop the game
   */
  setPlayMode() : void {
    this.gridService.setPlayMode(!this.isPlaying);
  }

  /**
   * Get next grid step by spreading existing fire
   */
  getGridNextStep() : void {
    this.gridService.getGridNextStep();
  }


}
