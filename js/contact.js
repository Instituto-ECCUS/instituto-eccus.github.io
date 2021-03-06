$(document).ready(function () {
  (function ($) {
    'use strict';

    jQuery.validator.addMethod(
      'answercheck',
      function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value);
      },
      'type the correct answer -_-'
    );

    // validate contactForm form
    $(function () {
      $('#contactForm').validate({
        rules: {
          name: {
            required: true,
            minlength: 2,
          },
          subject: {
            required: true,
            minlength: 4,
          },
          number: {
            required: true,
            minlength: 5,
          },
          email: {
            required: true,
            email: true,
          },
          message: {
            required: true,
            minlength: 20,
          },
        },
        messages: {
          name: {
            required: 'Qual é o seu nome?',
            minlength: 'Seu nome deve conter pelo menos dois caracteres',
          },
          subject: {
            required: 'Sobre o que você quer falar?',
            minlength: 'Seu assunto deve conter pelo menos 4 caracteres',
          },
          number: {
            required: 'Qual é o seu número?',
            minlength: 'Seu número deve conter pelo menos 5 caracteres',
          },
          email: {
            required: 'Qual é o seu e-mail?',
          },
          message: {
            required: 'O que você quer nos dizer?',
            minlength: 'Isso é tudo? : )',
          },
        },
        submitHandler: function (form) {
          $(form).ajaxSubmit({
            type: 'POST',
            data: $(form).serialize(),
            url: 'contact_process.php',
            success: function () {
              $('#contactForm :input').attr('disabled', 'disabled');
              $('#contactForm').fadeTo('slow', 1, function () {
                $(this).find(':input').attr('disabled', 'disabled');
                $(this).find('label').css('cursor', 'default');
                $('#success').fadeIn();
                $('.modal').modal('hide');
                $('#success').modal('show');
              });
            },
            error: function () {
              $('#contactForm').fadeTo('slow', 1, function () {
                $('#error').fadeIn();
                $('.modal').modal('hide');
                $('#error').modal('show');
              });
            },
          });
        },
      });
    });
  })(jQuery);
});
