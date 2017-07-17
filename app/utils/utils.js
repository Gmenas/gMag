const showErrorPage = (msg, res) => {
    const context = {
        title: 'Error',
        errorMsg: msg,
    };
    return res.render('Error', context);
};

module.exports = { showErrorPage };
