$(document).ready(function () {
    loadDvds();
    addDvd();
    $('#topButton').click(function(){
        $('#dvdTableDiv').hide(); 
        $('#addDvdDiv').show();
    });
});
//http://dvd-library.us-east-1.elasticbeanstalk.com


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

                
                
                var row = '<tr>';
                    row += '<td>' + title + '</td>';
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

