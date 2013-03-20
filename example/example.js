jQuery(function($) {
  $('form').submit(function(event) {
    event.preventDefault();
    return false;
  });

  $('.hide-spinners').click(function() {
    $('.in-element input, .in-form').hideSpinner();
  });

  $.setSpinnerDefaults({image: '../img/loading.gif', position: 'after'});

  $('form.click input').clickSpinner();

  $('form.submit').submitSpinner();

  $('form.multi_submit').submitSpinner({target: '.submit2'});

  $('form.spinneroff input').clickSpinner({
    onCreate: function(spinner) {
      setTimeout(function() {
        spinner.hide();
      }, 1000);
    }
  });

  $('form.spinnerfield input').customSpinner(function(spinner) {
    $(this).focus(function() {
      spinner.show($(this));
    });
    $(this).blur(function() {
      spinner.hide();
    });
  });

  $('form.customspinner input').clickSpinner({
    create: function() {
      var element = document.createElement('span');
      element.innerText = 'Loading ...';
      this.created(element);
    },
    onCreate: function(spinner) {
      setTimeout(function() { spinner.hide(); }, 1000);
    }
  });
});
