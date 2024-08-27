module.exports = (sequelize, Sequelize) => {
    const Loan = sequelize.define('loan', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bookId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
        loanDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        endDate: {
            type: Sequelize.DATE
        },
        returnDate: {
            type: Sequelize.DATE
        }
    });
    return Loan;
}