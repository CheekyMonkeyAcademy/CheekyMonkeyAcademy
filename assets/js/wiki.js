fadein();
function fadein(){
  $('body').hide().fadeIn(2000);
}
$(document).ready(function() {
  
  $('#searchTerm').click(function(){
 $('#searchTerm').attr('placeholder', 'Wiki');
  });
  
  function sample() {
    var searchTerm = $("#searchTerm").val();
    var url =
      "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
      searchTerm +
      "&format=json&callback=?&limit=1";
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      dataType: "json",
      
      success: function(data) {
        $(".question").html("<hr>");
        console.log(searchTerm);

        


        $("a").html("<button target='blank' href="+data[3][0]+">Wiki will help you with your search of " + searchTerm + "</button>");
        
        for (var i = 0; i < data[1].length; i++) {
          
        
         $('#output').append("<div><a target='blank' href="+data[3][i]+"><h2>"+data[1][i]+"</h2></a>"+"<p>"+data[2][i]+"</p></div><hr>");
       
          
        } //for loop ends
        $("#searchTerm").val("");
      },
      error: function(error) {
        alert("error");
      }
    }); //ajax ends
  }; //click function ends
  $("#searchTerm").keypress(function(e) {
    if (e.which == 13) {
      sample();
    }
  }); //on keypress

   $("a").click(function() {
          //sample();
          //console.log($("a")[1].href);
          // if ($("a")[1].href = null)
          // {
          //   alert("type request");
          // }
          // else {
          window.open($("a")[1].href, '_blank');
          //}
    
  });
});
