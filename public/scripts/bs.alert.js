window.bs = {
    alert: function(message, alerttype) {
        $('.alert-holder').append(
            '<div class="alert alert-' + alerttype + '">' +
            '<a class="close" data-dismiss="alert">×</a><span>' + message + '</span></div>'
        );
    },
    loginAlert: function(url) {
        window.bs.alert('You must be logged in to do this. Login <a href="' + url + '">here</a>', 'warning');
    },
};
