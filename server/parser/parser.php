<?php

function chope_string_entre_deux_delimiteur($delimiteur_deb, $text_a_fouiller, $delimiteur_fin) {
	$text_a_fouiller = "recalage_auto".$text_a_fouiller;
	$explode_phase_1 = explode($delimiteur_fin, $text_a_fouiller);
	if($explode_phase_1[0] != "") {
		$explode_phase_2 = explode($delimiteur_deb, $explode_phase_1[0]);
		if($explode_phase_2[1] != "") {
			return $explode_phase_2[1];
		}
	} else {
		return "";
	}
}

function writeContentToFile($content, $filename) {
	$file = fopen($filename, "a+");
	
	fputs($file, "<?xml version=\"1.0\"?>\n");
	fputs($file, utf8_encode($content));

	fclose($file);
}

function parse($content) {
    $contentToParse = chope_string_entre_deux_delimiteur("<jdm>", $content, "</jdm>");
    $contentToParse = "<jdm>" . $contentToParse . "</jdm>";
    
    $filename = "file.xml";
    writeContentToFile($contentToParse, $filename);

    $document_xml = new DomDocument;
    $document_xml->load($filename);
    $elements = $document_xml->getElementsByTagName('jdm');
    var_dump($elements->item(0));
}

//parse("<rel type=\"r_isa\" poids=\"128\" tid=\"436343\" te=\"carnassier>48855\">carnassier  (carnivore)</rel>");
