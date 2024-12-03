<?php

    class Grid implements JsonSerializable {

        // Each possible cell state
        const GRID_TREE = 0;
        const GRID_FIRE = 1;
        const GRID_ASHE = 2;
        const GRID_WILL_FIRE = 3;   // Temporary state

        private $rows;
        private $cols;
        private $cells = [];
        private $fireSpread;
        private $isPlaying = false;

        private $fireCellsList = [];

        // Create an grid with a single cell
        public function __construct() {
            $this->setSize(1, 1);
            $this->setFireSpread(0.5);
        }

        /**
         * Create default grid cells filled with trees
         * Reset the fire cells list
         */
        private function createCells() {
            $this->cells = [];
            $this->fireCellsList = [];
            for($i = 0; $i < $this->rows; $i++) {
                $this->cells[$i] = [];
                for($j = 0; $j < $this->cols; $j++) {
                    $this->cells[$i][$j] = self::GRID_TREE;
                } 
            }
        }

        /**
         * Set grid size and create default grid cells
         */
        public function setSize($rows, $cols) {
            $this->rows = max($rows, 1);
            $this->cols = max($cols, 1);
            $this->createCells();
        }

        /**
         * Set fire spread rate
         * Clamped between [0, 1]
         */
        public function setFireSpread($fireSpread) {
            $this->fireSpread = max(0, min(1, $fireSpread));
        }

        /**
         * Clear all cell states back to default
         */
        public function clearGrid() {
            $this->createCells();
            $this->setPlayMode(false);
        }

        /**
         * Set randomly each cells on fire with the given fireChance
         * fireChance is [0, 1]
         */
        public function setRandomFireCells($fireChance) {
            // Clear current cells before randomize them
            $this->clearGrid();

            for($i = 0; $i < $this->rows; $i++) {
                for($j = 0; $j < $this->cols; $j++) {
                    if (mt_rand() / mt_getrandmax() < $fireChance) {
                        $this->cells[$i][$j] = self::GRID_FIRE;
                        $this->fireCellsList[] = [$i, $j];
                    }
                } 
            }
        }

        /**
         * Set the cell with the given coordinates to it next state
         * If the current state is the last one (GRID_ASHE), set it to the first state
         */
        function changeCellState($x, $y) {
            $this->cells[$x][$y] = ($this->cells[$x][$y]+1) % 3;

            // Add this cell to fireCellsList if GRID_FIRE
            if ($this->cells[$x][$y] == self::GRID_FIRE) {
                $this->fireCellsList[] = [$x, $y];
            } else { // Remove this cell from fireCellsList otherwise
                for($i = 0; $i < count($this->fireCellsList); $i++) {
                    if ($this->fireCellsList[$i] == [$x, $y]) {
                        array_splice($this->fireCellsList, $i, 1);
                        break;
                    }
                }
            }

        }

        /**
         * Start or stop the fire propagation with isPlaying
         */
        public function setPlayMode($isPlaying) {
            $this->isPlaying = $isPlaying;
        }

        /**
         * Compute the next grid step by spreading fire and ashes
         */
        public function getNextStep() {
            $nextFireCellsList = [];

            // Spread fire for each fire cells
            for($i = 0; $i < count($this->fireCellsList); $i++) {
                $neighborsCells = $this->getNeighborsCells( $this->fireCellsList[$i][0], $this->fireCellsList[$i][1] );
                for($j = 0; $j < count($neighborsCells); $j++) {
                    $x = $neighborsCells[$j][0];
                    $y = $neighborsCells[$j][1];

                    // If this neighbor cell is a tree 
                    if ($this->cells[$x][$y] == self::GRID_TREE && mt_rand() / mt_getrandmax() < $this->fireSpread) {
                        $nextFireCellsList[] = [$x, $y];
                        // Set this state cell with GRID_WILL_FIRE to prevent duplicates in nextFireCellsList
                        $this->cells[$x][$y] = self::GRID_WILL_FIRE;
                    }
                }
            }
            for($i = 0; $i < count($nextFireCellsList); $i++) {
                $x = $nextFireCellsList[$i][0];
                $y = $nextFireCellsList[$i][1];
                $this->cells[$x][$y] = self::GRID_FIRE;
            }

            // Convert all current fire cells to ashes
            for($i = 0; $i < count($this->fireCellsList); $i++) {
                $x = $this->fireCellsList[$i][0];
                $y = $this->fireCellsList[$i][1];
                $this->cells[$x][$y] = self::GRID_ASHE;
            }

            // Update fireCellsList with new fire cells
            $this->fireCellsList = $nextFireCellsList;

            // Check if there is no more cells to burn
            // If true, stop the game
            if (count($this->fireCellsList) == 0) {
                $this->isPlaying = false;
            }
        }

        /**
         * Return the adjacents cells coordinates for the currents cell coordinates if not out of bounds
         */
        private function getNeighborsCells($x, $y) {
            $cells = [];

            if ( $x-1 >= 0 ) {          // Top
                $cells[] = [$x-1, $y]; 
            }
           
            if ( $x+1 < $this->rows ) { // Bottom
                $cells[] = [$x+1, $y]; 
            }
            
            if ( $y-1 >= 0 ) {          // Left
                $cells[] = [$x, $y-1];
            } 
            
            if ( $y+1 < $this->cols ) { // Right
                $cells[] = [$x, $y+1];
            } 

            return $cells;
        }

        /**
         * From JsonSerializable
         * Return this stringify object 
         */
        public function jsonSerialize() {
            return [
                'rows' => $this->rows,
                'cols' => $this->cols,
                'cells' => $this->cells,
                'fireSpread' => $this->fireSpread,
                'isPlaying' => $this->isPlaying,
            ];
        }
    }
?>