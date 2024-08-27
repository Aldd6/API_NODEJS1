const db = require('../config/db.config.js');
const Loan = db.Loans;

exports.createLoan = (req, res) => {
    try {
        let loan = {};

        loan.bookId = req.body.bookId;
        loan.userId = req.body.userId;
        loan.loanDate = req.body.loanDate;
        loan.endDate = req.body.endDate;
        loan.returnDate = req.body.returnDate;

        Loan.create(loan).then(loan => {
            res.status(200).json({
                message: 'Loan created successfully',
                loan: loan
            });
        });
    }catch(error) {
        res.status(500).json({
            message: 'Failed to create loan',
            error: error.message
        });
    }
}

exports.retriveAllLoans = (req, res) => {
    Loan.findAll().then(loans => {
        res.status(200).json({
            message: 'All loans retrieved successfully',
            loans: loans
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Failed to retrieve loans',
            error: error.message
        });
    });
}

exports.getLoanById = (req, res) => {
    let loanId = req.params.id;

    Loan.findByPk(loanId).then(loan => {
        res.status(200).json({
            message: 'Loan retrieved successfully',
            loan: loan
        });
    })
    .catch(error => {
        res.status(404).json({
            message: 'Loan not found',
            error: error.message
        });
    });
}

exports.updateById = async(req, res) => {
    let loanId = req.params.id;
    let loan = await Loan.findByPk(loanId);

    if(!loan){
        res.status(404).json({
            message: 'Loan not found',
            loan: " "
        });
    }else {
        let updateObject = {
            bookId: req.body.bookId,
            userId: req.body.userId,
            loanDate: req.body.loanDate,
            endDate: req.body.endDate,
            returnDate: req.body.returnDate
        }

        let result = await Loan.update(updateObject, {returning: true, where: {id: loanId}});

        if(!result) {
            res.status(500).json({
                message: 'Failed to update loan',
                error: " "
            });
        }else {
            res.status(200).json({
                message: 'Loan updated successfully',
                loan: result[0]
            });
        }
    }
}

exports.deleteById = async(req, res) => {
    try {
        let loanId = req.params.id;
        let loan = await Loan.findByPk(loanId);

        if(!loan) {
            res.status(404).json({
                message: 'Loan not found',
                loan: " "
            });
        }else {
            await loan.destroy();
            res.status(200).json({
                message: 'Loan deleted successfully',
                loan: loan
            });
        }
    }catch(error) {
        res.status(500).json({
            message: 'Failed to delete loan',
            error: error.message
        });
    }
}