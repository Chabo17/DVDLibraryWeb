$(document).ready(function () {
    loadDvds();
    addDvd();
    
});
//http://dvd-library.us-east-1.elasticbeanstalk.com

function hideEverything(){
    $('#topButton').click(function(){
        $('#dvdTableDiv').hide();
        $('#dvdInfoDiv').hide();  
        $('#addDvdDiv').show();
    });
}

function hideAllDVDS(){
    $('#dvdTableDiv').hide();
}

function loadDvds() {
    //clearContactTable();
    var contentRows = $('#contentRows');
    
    $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvds',
        success: function(contactArray) {
            $.each(contactArray, function(index, contact){
                var id = contact.id;
                var title = contact.title;
                var releaseYear = contact.releaseYear;
                var director = contact.director;
                var rating = contact.rating;
                var notes = contact.notes;

                
                // <!--- need on clicks --->
                var row = '<tr>';
                    row += '<td><a href="#" onClick="showDvdInfo(' + id + ');">' + title + '</a></td>';
                    row += '<td>' + releaseYear + '</td>';
                    row += '<td>' + director + '</td>';
                    row += '<td>' + rating + '</td>';
                    row += '<td><a onlcick= "" >Edit</a> | <a onlcick= "">Delete</a></td>'     
                    row += '</tr>';
                contentRows.append(row);
            })
        },
        error: function() {
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
        }
    }); 

}

function addDvd() {
    $('#addDvdButton').click(function (event) {
        //var haveValidationErrors = checkAndDisplayValidationErrors($('#addForm').find('input'));
        
        // if(haveValidationErrors) {
        //     return false;
        // }
        $.ajax({
           type: 'POST',
           url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd',
           data: JSON.stringify({
                title: $('#addTitle').val(),
                releaseYear: $('#addReleaseYear').val(),
                director: $('#addDirector').val(),
                rating: $('#addRating').val(),
                notes: $('#addNotes').val(),
           }),
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           'dataType': 'json',
           success: function() {
               $('#errorMessages').empty();
               $('#add#addTitle').val('');
               $('#addReleaseYear').val('');
               $('#addDirector').val('');
               $('#addRating').val('');
               $('#addNotes').val('');
               loadDvds();
           },
           error: function () {
               $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.')); 
           }
        })
    });
}

function showDvdInfo(dvdId) {
    hideAllDVDS();
    var contentRows = $('#dvdInfoDiv');
    $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + dvdId,
        success: function(dvd) {//TODO FIX SPACING
            $('#dvdInfoDiv').empty();

                 var row = '<div class="row">';
                    row += '<h1 id="titleInfo" class="offset-md-4 col-md-8">' + dvd.title +'</h1>';
                    row += '<hr>';
                    row += '<div id="releaseYearInfo" class="offset-md-4 col-md-8">'+ dvd.releaseYear +' </div>';
                    row += '<div id="ratingInfo" class="offset-md-4 col-md-8">'+ dvd.rating +'</div>';
                    row += '<div id="notesInfo" class="offset-md-4 col-md-8">'+dvd.notes+'</div>'
                    // row += '' BUTTON     
                    row += '</div>';
                contentRows.append(row);

        },
        error: function() {
            alert("failed dvd info");
            /*$('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));*/
        }
    });
}

