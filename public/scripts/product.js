$(function() {
    $('#contact-seller').on('click', function() {
        var username = window.seller.username;

        var user;
        $.getJSON('/api/users', { username: username }, function(data) {
            if (data.error) {
                return alert(data.error);
            }
            user = data;

            var $link = $('<a>');
            $link.css('font-size: 20px')
            $link.attr('href', 'mailto:' + user.email);
            $link.html(user.email)

            $('#contact-seller').remove();
            $('#email').html($link).removeClass('hidden')
        });
    });
});
