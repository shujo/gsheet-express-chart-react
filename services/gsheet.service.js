const dotenv = require('dotenv');
const _ = require('lodash');
const { GoogleSpreadsheet } = require('google-spreadsheet');
dotenv.config()

const connect = worksheetId => {
    return new Promise(async(resolve, reject) => {      
        try{
          const doc = new GoogleSpreadsheet(worksheetId);
          await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOLE_PRIVATE_KEY
          });
          await doc.loadInfo();
          resolve(doc)
        }catch(err){
          reject(err)
        }
    }) 
}

const getWorksheetService = doc => {
    return new Promise((resolve, reject) => {
        try {
            let worksheets = Object.values(doc).map(ws => {
                return {
                    index: ws._rawProperties.index,
                    sheetId: ws._rawProperties.sheetId,
                    title: ws._rawProperties.title
                }
            })
            resolve(worksheets)
        } catch (error) {
            reject(error)
        }
    })
}

const getHeaderService = options => {
    return new Promise(async (resolve, reject) => {
        let { doc, sheetId } = options;
        try{
            let sheet = await doc.sheetsById[sheetId];
            let rows = await sheet.getRows();
        
            let headers = rows[0]._sheet.headerValues;
            resolve(headers)
        }catch(err){
            reject(err)
        }
    })
}

const getRowService = (options, headers) => {
  return new Promise(async (resolve, reject) => {
    try{
        if(!headers){
            resolve({
                message: 'Please provide headers!'
            })
        }

        let { doc, sheetId } = options
        let sheet = await doc.sheetsById[sheetId];
        let rows = await sheet.getRows(); 
  
        let data = [];
        for(let x in rows){
          let row = rows[x];
  
          let obj = {}
          for(let y in headers){
            let header = headers[y];
            let rowData = row[header];
            
            if(y == 0){
              obj.title = rowData;
            }

            if(y == 1){
              obj.value = rowData;
            }
          }
          data.push(obj)
  
          if(x == rows.length-1){
            resolve(data);
          }
        }
    }catch(err){
        reject(err);
    }
  })
}

module.exports = { connect, getWorksheetService, getHeaderService, getRowService };