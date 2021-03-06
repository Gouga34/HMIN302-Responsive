function getWordDescription() {
    var word = document.getElementById("searchedWord").value;

    $.ajax({
        url: 'http://find-yours-pets.esy.es/server/index.php',
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
  printWord(datas.mot.val);
  printGenderRow(datas);
  printDefinitions(datas.def);
  printOtherDatas(datas);
}

function printGenderRow(datas){
  if (typeof datas.r_fem != 'undefined') {
    rowId = "genderRow";
    addRow(rowId);

    printGenders(datas.r_fem, rowId);
  }
}

function printOtherDatas(datas) {
  nbDatasInRow = 0;
  nbRows = 1;
  idRow = "1";
  addRow(idRow);
  for (key in datas) {
    if (nbDatasInRow >= 3) {
      nbRows++;
      idRow = nbRows.toString();
      addRow(idRow);

      nbDatasInRow = 0;
    }

    if (isElementNotAlreadyWritten(key)) {
      if (typeof types[key] != 'undefined') {
        writeElements(datas[key], key, idRow, types[key]);
        nbDatasInRow++;
      }
    }
  }
}

function isElementNotAlreadyWritten(key) {
  return key != "mot" && key != "def" && key != "r_fem" && key != "mot-formate";
}

function writeElements(elements, typeOfElements, rowId, title) {
  datasToWrite = "<section class=\"col-lg-3 col-sm-3\">";
  datasToWrite += "<h4 class=\"text-center\">" + title + "</h4>";
  datasToWrite += "<p>";

  if (Object.size(elements) > 10) {
    datasToWrite += addSeeMoreButton(typeOfElements);
  }

  numberOfElementsDisplayed = 0;

  for (key in elements) {
    numberOfElementsDisplayed++;

    if(numberOfElementsDisplayed == 10) {
      datasToWrite += "<section id=\"" + typeOfElements + "Collapse\" class=\"collapse\">";
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
  datasToWrite = "<a class=\"btn btn-default btn-circle\" href=\"#" + key + "Collapse\" data-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"" + key + "Collapse\">"+
                        "<span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span></a>";

  return datasToWrite;
}

function printWord(word) {
  rowId = "wordRow";
  addRow(rowId)
  datasToWrite = "<section class=\"col-lg-12 col-sm-12\"> "
                    + "<h1 class=\"text-center\">" + word + "</h1> "
                    +" </section>";
  addElementToDivById(rowId, datasToWrite);
}

function printDefinitions(defs) {
  if (Object.size(defs) > 0) {
    idRow = "rowDefinitions";
    addRow(idRow);
    datasToWrite = "<section class=\"col-lg-12 col-md-12\">";
    datasToWrite += "<h4 > Définitions </h4>";

    if (Object.size(defs) > 2) {
      datasToWrite += addSeeMoreButton("definitions");
    }

    numberOfElementsDisplayed = 0;

    for (key in defs) {

      if (numberOfElementsDisplayed > 2) {
        datasToWrite += "<section id=\"definitionsCollapse\" class=\"collapse\">";
      }

      datasToWrite += "<p>" + defs[key] + "</p>";
      numberOfElementsDisplayed++;
    }
    if (numberOfElementsDisplayed > 3) {
      datasToWrite += "</section>";
    }

    addElementToDivById(idRow, datasToWrite);
  }
}

function printGenders(genders, rowId) {
  if (Object.size(genders) > 0) {
    datasToWrite = "<section class=\"col-lg-6 col-sm-6 col-xs-6 align-center\">";
    datasToWrite += "<p><strong style=\"color: #3FB9A9\">" + types["r_fem"] + "</strong> : ";
    for (key in genders) {
      datasToWrite += genders[key].val + ",  ";
    }

    datasToWrite += "</p></section>";
    addElementToDivById(rowId, datasToWrite);
  }
}

function addRow(idRow) {
  newRow = "<div class=\"row\" id=\""+idRow+"Row\"></div>";
  newRow += "<div id="+idRow+"></div>";
  $("#resultContainer").append(newRow);
}

function addElementToDivById(idRow, datasToWrite) {
  $("#"+idRow).append(datasToWrite);
}

Object.size = function(arr)
{
    var size = 0;
    for (var key in arr)
    {
        if (arr.hasOwnProperty(key)) size++;
    }
    return size;
};
