const { connect, getWorksheetService, getHeaderService, getRowService } = require('../services/gsheet.service');

const getWorkSheets = async (req, res, next) => {
    try {
        const response = await connect(req.query.worksheetId);
        const worksheets = await getWorksheetService(response._rawSheets)
        res.status(200).json(worksheets)
    } catch (error) {
        next(error)
    }
}

const getHeaders = async (req, res, next) => {
    try {
        let { worksheetId, sheetId, removeEmptyVal } = req.query;
        const doc = await connect(worksheetId);
        let headers = await getHeaderService({doc, sheetId})
        if(removeEmptyVal){
            res.status(200).json(headers.filter(e => e !== ''))
        }else{
            res.status(200).json(headers)
        }
    } catch (error) {
        next(error)
    }
}

const getRows = async (req, res, next) => {
    try {
        let { worksheetId, sheetId } = req.query;
        let { headers } =  req.body;

        const doc = await connect(worksheetId);
        const rows = await getRowService({ doc, sheetId }, headers)
        res.status(200).json(rows)
    } catch (error) {
        next(error)
    }
}

module.exports = { getWorkSheets, getHeaders, getRows }