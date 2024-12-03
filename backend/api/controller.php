<?php
	include_once($_SERVER['DOCUMENT_ROOT']."/api/grid.php");

	session_cache_limiter(false);
	session_start();

	// DEBUG
	// ini_set('display_errors', '1');
	// error_reporting(E_ALL);
		
	// Singleton like : Check if grid instance exists, create it in session instead
	if (!isset($_SESSION["grid"])) {
		$_SESSION["grid"] = new Grid();
	}

	$data = json_decode(file_get_contents("php://input"), true);

	if (!isset($data['action'])) {
		// DEBUG
		// echo json_encode($_SESSION["grid"]);
		return;
	}

	switch ($data["action"]) {
		case "getGrid":
			echo json_encode($_SESSION["grid"]);
			break;

		case "setGridSize":
			$width = $data["width"];
			$height = $data["height"];
			$_SESSION["grid"]->setSize($width, $height);
			echo json_encode($_SESSION["grid"]);
			break;

		case "setFireSpreadRate":
			$fireSpread = $data["fireSpread"];
			$_SESSION["grid"]->setFireSpread($fireSpread);
			echo json_encode($_SESSION["grid"]);
			break;

		case "setRandomFireCells":
			$fireChance = $data["fireChance"];
			$_SESSION["grid"]->setRandomFireCells($fireChance);
			echo json_encode($_SESSION["grid"]);
			break;

		case "changeCellState":
			$x = $data["x"];
			$y = $data["y"];
			$_SESSION["grid"]->changeCellState($x, $y);
			echo json_encode($_SESSION["grid"]);
			break;
	
		case "clearGrid":
			$_SESSION["grid"]->clearGrid();
			echo json_encode($_SESSION["grid"]);
			break;
	
		case "setPlayMode":
			$isPlaying = $data["isPlaying"];
			$_SESSION["grid"]->setPlayMode($isPlaying);
			echo json_encode($_SESSION["grid"]);
			break;
			
		case "getGridNextStep":
			$_SESSION["grid"]->getNextStep();
			echo json_encode($_SESSION["grid"]);
			break;	
	}
?>