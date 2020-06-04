const router = require('express').Router();
const { getWorkSheets, getHeaders, getRows } = require('../controller/gsheet.controller');

/*
ACTION:
- GET REQUEST
QUERY PARAMS:
 - worksheetId: string
RESPONSE:
- Retrieve Worksheet List
*/
router.get('/get-worksheets', getWorkSheets);

/*
ACTION:
- GET REQUEST
QUERY PARAMS:
 - worksheetId: string
 - sheetId: string
 - removeEmptyVal: boolean

RESPONSE:
- Retrieve Headers
*/
router.get('/get-headers', getHeaders);

/*
ACTION:
- POST REQUEST
QUERY PARAMS:
 - worksheetId: string
 - sheetId: string
BODY PARAMS:
 - headers: Array

RESPONSE:
- Retrieve Rows
*/
router.post('/get-rows', getRows);


module.exports = router;