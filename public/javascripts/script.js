document.ready = (function() {
    var burger = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav-menu');
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });

    $('#delete').on('click', function(e){
      e.preventDefault();

      $('input:checked').each(function(index, value){
        var val = $(this).attr('id');
        console.log($(this));
        var $thisInput = $(this);

        $.ajax({
          url:'/books/'+val,
          type:'DELETE'
        }).done(function(){
          $thisInput.parents('tr').remove();
        });
      });
    });

    $('#loginButton').click(function(e){
      var username = $('#username').val();
      var password = $('password').val();

      if(email === "" || password=== ""){
        e.preventDefault();
        return false;
      }

      $.ajax({
        type: "POST",
        url: "/admin/login",
        data: JSON.stringify({
          username: username,
          password: password
        }),
          contentType: "application/json"
      }).done(function (r){
        if(r.success){
          var username = $('#username').val("");
          var password = $('#password').val("");
          window.location = r.redirect;
        }
        else 
          window.alert(r.message);
      });

    });

})();

// var selector = document.querySelectorAll('#nav a');
// // $(selector).on('click', function(){
// //     $(selector).removeClass('is-active');
// //     $(this).addClass('is-active');
// // });
// $(document).ready(function(){
//     $(selector).click(function(e){
//          $(e.currentTarget).addClass('is-active');
//     });
// });


