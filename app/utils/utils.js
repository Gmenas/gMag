const displayError = (msg, res) => {
    const context = {
        title: 'Error',
        errorMsg: msg,
    };
    return res.render('error', context);
};

module.exports = { displayError };
