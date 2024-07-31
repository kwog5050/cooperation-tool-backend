const TokenDto = function (user) {
    this.token = user.token,
        this.email = user.email
}

module.exports = TokenDto;