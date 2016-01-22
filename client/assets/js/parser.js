function getWordDescription() {

    var word = document.getElementById("searchedWord").value;

    $.ajax({
        url: 'http://localhost/Responsive/server/index.php',
        type: 'GET',
        data: 'word=' + word,

        success: function(data) {
            $("#ba").text(data);
            alert(data);
        },
        error: function(data) {
            alert("erreur : " + data);
        }
    });
}

function writeDataInFile(data) {
    alert("writeDatas");
}
