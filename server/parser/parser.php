<?php

function getStringBetweenTwoDelims($startDelim, $text, $endDelim) {
	$text = "recalage_auto".$text;
	$explode_phase_1 = explode($endDelim, $text);
	if ($explode_phase_1[0] != "") {
		$explode_phase_2 = explode($startDelim, $explode_phase_1[0]);
		if ($explode_phase_2[1] != "") {
			return $explode_phase_2[1];
		}
	} else {
		return "";
	}
}

function writeContentToFile($content, $filename) {
	unlink($filename);
	$file = fopen($filename, "a+");
	
	fputs($file, "<?xml version=\"1.0\"?>\n");
	fputs($file, utf8_encode($content));

	fclose($file);
}

function getMot($xmlDoc, $result) {
	$elements = $xmlDoc->getElementsByTagName('mot');
	if (count($elements) > 0) {
		$element = $elements->item(0);

		$value = $element->nodeValue;
		$poids = ($element->hasAttribute('poids')) ? $element->getAttribute('poids') : "";
		$id = ($element->hasAttribute('id')) ? $element->getAttribute('id') : "";

		$result["mot"] = array('value' => $value, 'poids' => $poids, 'id' => $id);
	}

	return $result;
}

function getMotFormate($xmlDoc, $result) {
	$elements = $xmlDoc->getElementsByTagName('mot-formate');
	if (count($elements) > 0) {
		$element = $elements->item(0);

		$result["mot-formate"] = $element->nodeValue;
	}

	return $result;
}

function getDefinitions($xmlDoc, $result) {
	$elements = $xmlDoc->getElementsByTagName('def');
	if (count($elements) > 0) {
		$element = $elements->item(0);

		$definitions = array();
		$children = $element->childNodes;
		foreach ($children as $child) {
			if (!empty($child->nodeValue)) {
				$definitions[] = $child->nodeValue;
			}
		}

		$result["def"] = $definitions;
	}

	return $result;
}

function getRel($relElement) {
	$res = array();

	$res['value'] = $relElement->nodeValue;
	$res['type'] = ($relElement->hasAttribute('type')) ? $relElement->getAttribute('type') : "";
	$res['poids'] = ($relElement->hasAttribute('poids')) ? $relElement->getAttribute('poids') : "";
	$res['tid'] = ($relElement->hasAttribute('tid')) ? $relElement->getAttribute('tid') : "";
	$res['te'] = ($relElement->hasAttribute('te')) ? $relElement->getAttribute('te') : "";

	return $res;
}

function getRels($xmlDoc, $bloc, $result) {
	$elements = $xmlDoc->getElementsByTagName($bloc);
	if (count($elements) > 0) {
		$element = $elements->item(0);

		$relations = array();

		$relElements = $element->getElementsByTagName('rel');
		foreach ($relElements as $relElement) {
			$relations[] = getRel($relElement);
		}

		$result[$bloc] = $relations;
	}

	return $result;
}

function parse($content) {
    $contentToParse = getStringBetweenTwoDelims("<jdm>", $content, "</jdm>");
    $contentToParse = "<jdm>" . $contentToParse . "</jdm>";
    
    $filename = "file.xml";
    writeContentToFile($contentToParse, $filename);

    $xmlDoc = new DomDocument;
    $xmlDoc->load($filename);

    $result = array();

    // Récupération du mot
    $result = getMot($xmlDoc, $result);

    // Récupération du mot-formate
    $result = getMotFormate($xmlDoc, $result);

    // Définitions
    $result = getDefinitions($xmlDoc, $result);

    // Relations sortant
    $result = getRels($xmlDoc, 'sortant', $result);

    // Relations entrant
    $result = getRels($xmlDoc, 'entrant', $result);

    echo json_encode($result);
}
