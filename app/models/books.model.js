module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define('book', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING(60)
        },
        publisher: {
            type: Sequelize.STRING(25)
        },
        author: {
            type: Sequelize.STRING(25)
        },
        genre: {
            type: Sequelize.STRING(20)
        },
        authorCountry: {
            type: Sequelize.STRING(20)
        },
        noPages: {
            type: Sequelize.INTEGER
        },
        year: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.DOUBLE
        }
    });
    return Book;
};