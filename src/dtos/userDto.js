const UserDto = function (user) {
    this.email = user.email,
    this.password = user.password
    if (user.name) {
        this.name = user.name;
    }
}

module.exports = UserDto;