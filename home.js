$(document).ready(function () {
    loadDvds();
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
                var raiting = contact.raiting;
                var notes = contact.notes;

                
                
                var row = '<tr>';
                    row += '<td>' + name + '</td>';
                    row += '<td>' + company + '</td>';
                    row += '<td><button type="button" class="btn btn-info" onclick="showEditForm(' + contactId + ')">Edit</button></td>';
                    row += '<td><button type="button" class="btn btn-danger" onclick="deleteContact(' + contactId + ')">Delete</button></td>';
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