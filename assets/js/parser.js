function getWordDescription() {
    var word = document.getElementById("searchedWord").value;

    $.ajax({
        url: 'http://localhost/responsive/server/index.php',
        type: 'GET',
        data: 'word=' + word,

        success: function(data) {
          clearResultContainer();
          var datas = JSON.parse(data);
            printDatas(datas);
        },
        error: function(data) {
            alert("erreur : " + data);
        }
    });
}

function clearResultContainer() {
  $("#resultContainer").empty();;
}

function printDatas(datas) {
  printFirstRow(datas);
  printDefinitions(datas.def);
  printOtherDatas(datas);
}

function printFirstRow(datas){
  rowId = "firstRow";
  addRow(rowId);

  printWord(datas.mot.val, rowId);
  printGenders(datas.r_fem, rowId);
}

function printOtherDatas(datas) {
  nbDatasInRow = 0;
  nbRows = 1;
  idRow = "1";
  addRow(idRow);
  for (key in datas) {
    if (nbDatasInRow == 2) {
      addRow(nbRows.toString());
      nbRows++;
      nbDatasInRow = 0;
    }

    if(isElementNotAlreadyWritten(key)) {
      writeElements(datas[key], key, rowId);
    }

    nbDatasInRow++;
  }
}

function isElementNotAlreadyWritten(key) {
  return key != "mot" && key != "def" && key != "r_fem" && key != "mot-formate";
}

function writeElements(elements, typeOfElements, rowId) {
  //TODO aller récup équivalent typeOfElements dans tableau contenant ttes les trads
  datasToWrite = "<section class=\"col-lg-3 col-sm-3\">";
  datasToWrite += "<p class=\"text-center\">" + typeOfElements + "</p>";
  datasToWrite += "<p>";

  numberOfElementsDisplayed = 0;

  for (key in elements) {
    numberOfElementsDisplayed++;
    if(numberOfElementsDisplayed == 10) {
      datasToWrite += addSeeMoreButton(typeOfElements);
    }

    datasToWrite += elements[key].val + ", ";
  }

  if (numberOfElementsDisplayed >= 10) {
    datasToWrite += "</section>";
  }
  datasToWrite += "</p>";
  addElementToDivById(rowId, datasToWrite);


}

function addSeeMoreButton(key) {
  datasToWrite = "<a class=\"btn btn-primary\" href=\"#" + key + "Collapse\" data-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"" + key + "Collapse\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span></a>";
  datasToWrite += "<section id=\"" + key + "Collapse\" class=\"collapse\">";

  return datasToWrite;
}

function printWord(word, rowId) {
  datasToWrite = "<section class=\"col-lg-6 col-sm-6\"> "
                    + "<p class=\"text-center\">" + word + "</p> "
                    +" </section>";
  addElementToDivById(rowId, datasToWrite);
}

function printDefinitions(defs) {
  idRow = "rowDefinitions";
  addRow(idRow);
  datasToWrite = "<section class=\"col-lg-6 col-md-6\">";
  datasToWrite += "<p class=\"text-center\"> Définitions </p>";

  for (key in defs) {
    datasToWrite += "<p>" + defs[key] + "</p>";
  }

  addElementToDivById(rowId, datasToWrite);
}

function printGenders(genders, rowId) {
  datasToWrite = "<section class=\"col-lg-6 col-sm-6 col-xs-6 align-center\">";
  datasToWrite += "<p class=\"text-center\">Opposé</p>";
  for (key in genders) {
    datasToWrite += "<p>" + genders[key].val + "</p>";
  }

  datasToWrite += "</section>";
  addElementToDivById(rowId, datasToWrite);
}

function addRow(idRow) {
  newRow = "<div class=\"row\" id=\""+idRow+"\"></div>";
  $("#resultContainer").append(newRow);
}

function addElementToDivById(divId, datasToWrite) {
  $("#"+rowId).append(datasToWrite);
}
