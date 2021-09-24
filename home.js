$(document).ready(function () {
    loadDvds();
    addDvd();
    hideEverything();
    updateDVD();
    
});
//http://dvd-library.us-east-1.elasticbeanstalk.com

function hideEverything(){
    $('#topButton').click(function(){
        $('#dvdTableDiv').hide();
        $('#dvdInfoDiv').hide();  
        $('#addDvdDiv').show();
    });
}

function showEverything(){
    $('#dvdInfoDiv').hide();  
    $('#addDvdDiv').hide();
    $('#dvdTableDiv').show();
}

function showDVDInfo(){
    $('#dvdTableDiv').hide();
    $('#dvdInfoDiv').show();
}

function loadDvds() {
    //clearContactTable();
    var contentRows = $('#contentRows');
    contentRows.empty();
    
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
                    row += '<td><a href="#" onclick= "showEditDVD('+id+')" >Edit</a> | <a href="#" onclick= "deleteDVD(' + id + ')">Delete</a></td>'     
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
    showDVDInfo();
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
                    row += '<button type="button id="showCancelButton" class="btn btn-danger" onclick="showEverything()">Cancel</button>';      
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

function performSearch(){
    var searchBox = $('#boxInput').val();
    var contentRows = $('#contentRows');
    contentRows.empty();
    $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvds/title/' + searchBox,
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
                    row += '<td><a href="#" onclick= "showEditDVD('+id+')" >Edit</a> | <a href="#" onclick= "deleteDVD(' + id + ')">Delete</a></td>'     
                    row += '</tr>';
                contentRows.append(row);
            })
        },
        error: function() {
            loadDvds();
            alert('Issue');
            // $('#errorMessages')
            //     .append($('<li>')
            //     .attr({class: 'list-group-item list-group-item-danger'})
            //     .text('Error calling web service. Please try again later.'));
        }
    }); 


}

function deleteDVD(dvdId){
    $.ajax({
        type: 'DELETE',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + dvdId,
        success: function(contactArray) {
            alert('DVD Deleted');
            loadDvds();
        },
        error: function() {
            loadDvds();
            alert('Issue');
            // $('#errorMessages')
            //     .append($('<li>')
            //     .attr({class: 'list-group-item list-group-item-danger'})
            //     .text('Error calling web service. Please try again later.'));
        }
    }); 


}


function showEditDVD(dvdId) {
    // showDVDInfo();
    $('#dvdTableDiv').hide();
    $('#editDvdDiv').show();

    // var contentRows = $('#dvdInfoDiv');
    $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + dvdId,
        success: function(dvd) {//TODO FIX SPACING
            // $('#dvdInfoDiv').empty();
                    $('#secretDvdId').val(dvd.id);
                    $('#editTitle').val(dvd.title);
                    $('#editRating').val(dvd.rating);
                    $('#editDirector').val(dvd.director);
                    $('#editReleaseDate').val(dvd.releaseYear);
                    $('#editNotes').val(dvd.notes);
                //  var row = '<div class="row">';
                //     row += '<h1 id="titleInfo" class="offset-md-4 col-md-8">' + dvd.title +'</h1>';
                //     row += '<hr>';
                //     row += '<div id="releaseYearInfo" class="offset-md-4 col-md-8">'+ dvd.releaseYear +' </div>';
                //     row += '<div id="ratingInfo" class="offset-md-4 col-md-8">'+ dvd.rating +'</div>';
                //     row += '<div id="notesInfo" class="offset-md-4 col-md-8">'+dvd.notes+'</div>'
                //     row += '<button type="button id="showCancelButton" class="btn btn-danger" onclick="showEverything()">Cancel</button>';      
                //     row += '</div>';
                // contentRows.append(row);

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

function updateDVD() {
    $('#editDvdButton').click(function(event) {

        // var haveValidationErrors = checkAndDisplayValidationErrors();
        // var dvdId = $('#editForm').find('input');
        // if(haveValidationErrors) {
            // return false;
        // }
        var dvdId = $(secretDvdId).val();

        $.ajax({
            type: 'PUT',
            url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + dvdId,
            data: JSON.stringify({
                dvdId: dvdId,
                title: $('#editTitle').val(),
                releaseYear: $('#editReleaseDate').val(),
                director: $('#editDirector').val(),
                rating: $('#editRating').val(),
                notes: $('#editNotes').val()
            }),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            'success': function() {
                alert('It worked!');
                // $('#errorMessage').empty();
                // hideEditForm();
                // loadContacts();
            },
            'error': function() {
                alert('Update Error');
                // $('#errorMessages')
                // .append($('<li>')
                // .attr({class: 'list-group-item list-group-item-danger'})
                // .text('Error calling web service. Please try again later.')); 
            }
        })
    })
};