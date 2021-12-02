module.exports = (messages) => {
    errors = [];
    for (let i = 0; i < messages.length; i++) {
        err = new Error(messages);
        errors.push(err.message);
    }
    return errors;
}