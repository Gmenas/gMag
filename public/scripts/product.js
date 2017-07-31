$(function() {
    var sellerId = window.ctx.product.sellerId;
    var productId = window.ctx.product._id;
    var title = window.ctx.product.title;

    $('#contact-seller').on('click', function() {
        $.getJSON('/api/users', { id: sellerId })
            .done(function(user) {
                var $link = $('<a>');
                $link.css('font-size: 20px');
                $link.attr('href', 'mailto:' + user.email);
                $link.html(user.email);

                $('#contact-seller').remove();
                $('#email').removeClass('hidden').append($link);
            })
            .fail(function(err) {
                window.bs.loginAlert('/login');
            });
    });

    $('#delete').on('click', function() {
        var confirmed = confirm('Are you sure you want to delete "' + title + '" ?');
        if (!confirmed) {
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
            })
            .fail(function(err) {
                window.bs.loginAlert('/login');
            });
    });
});
