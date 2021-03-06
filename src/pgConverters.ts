var moment = require('moment');

//--- add parsing for array types --------------------------------
export var arraySplit = (str) => {
    if (str == "{}") return [];
    str = str.substring(1, str.length-1); //cut off {}
    let e = /"((?:[^"]|\\")*)"(?:,|$)|([^,]*)(?:,|$)/g; //has to be mutable because of exec
    let valList = [];
    let parsingResult;
    do {
        parsingResult = e.exec(str);
        let valStr = (parsingResult[1]=='NULL'||parsingResult[2]=='NULL') ? null :
            (parsingResult[1]==''||parsingResult[2]=='') ? '' : parsingResult[1] || parsingResult[2] ;
        valList.push(valStr ? valStr.replace(/\\"/g,'"') : valStr);
    } while (parsingResult[0].substring(parsingResult[0].length-1,parsingResult[0].length)==',');
    return valList;
};
export var numWithValidation = val => {
    let v = +val;
    if (v > Number.MAX_SAFE_INTEGER || v < Number.MIN_SAFE_INTEGER) {
        throw Error("Number can't be represented in javascript precisely: " + val);
    }
    return v;
};
export var arraySplitToNum = val => val=="{}" ? [] : val.substring(1, val.length-1).split(',').map(Number);
export var arraySplitToNumWithValidation= val => val=="{}" ? [] : val.substring(1, val.length-1).split(',').map(numWithValidation);
export var stringArrayToNumWithValidation= val => val.map(numWithValidation);
export var arraySplitToDate = val => val=="{}" ? [] : val.substring(1, val.length-1).split(',').map(d=>moment(d.substring(1, d.length-1)).toDate());

