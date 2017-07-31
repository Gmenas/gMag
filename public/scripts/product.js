$(function() {
    var sellerId = window.ctx.product.sellerId;
    var productId = window.ctx.product._id;

    $('#contact-seller').on('click', function() {
        var user;
        $.getJSON('/api/users', { id: sellerId })
            .done(function(user) {
                var $link = $('<a>');
                $link.css('font-size: 20px');
                $link.attr('href', 'mailto:' + user.email);
                $link.html(user.email);

                $('#contact-seller').remove();
                $('#email').html($link).removeClass('hidden');
            })
            .fail(function(err) {
                alert(err.responseText);
            });
    });

    $('#delete').on('click', function() {
        if (!confirm('Are you sure?')) {
            return;
        }

        $.ajax('/api/products', {
            type: 'DELETE',
            data: { productId: productId },
        })
            .done(function(data) {
                if (data.done) {
                    window.location = '/';
                }
            });
    });

    $('#favourite').on('click', function() {
        $.ajax('/api/products', {
            type: 'PATCH',
            data: { productId: productId },
        })
            .done(function(data) {
                if (data.favourited) {
                    $('#favourite span')
                        .removeClass('glyphicon-heart-empty')
                        .removeClass('glyphicon-heart')
                        .addClass('glyphicon-heart');
                } else {
                    $('#favourite span')
                        .removeClass('glyphicon-heart-empty')
                        .removeClass('glyphicon-heart')
                        .addClass('glyphicon-heart-empty');
                }
            });
    });
});
