#!/usr/bin/env node

//npm run compare /2023-4-25/Dummy/Google/234733.json /2023-4-25/Dummy/Google/234547.json
import fs from 'fs';
(async()=>{
console.log('processprocessprocessprocess', process.argv)
//let arguments = process.argv;
const oldReportJson =  process.argv[2] ?  process.argv[2] : '';
const newReportJson =  process.argv[3] ?  process.argv[3] : '';
console.log('oldReportJson', oldReportJson);

const PATH_TO_TEST_FOLDER = './tests';

const newReportData = JSON.parse(fs.readFileSync(PATH_TO_TEST_FOLDER + newReportJson, 'utf8'));
const oldReportData = JSON.parse(fs.readFileSync(PATH_TO_TEST_FOLDER + oldReportJson, 'utf8'));


//console.log('HERE IS URL ', oldReportData['requestedUrl']);
console.log('first-contentful-paint');
const fcpScore = calculateScore(oldReportData['audits']['first-contentful-paint']['score'], newReportData['audits']['first-contentful-paint']['score'], getWeightage(newReportData['categories']['performance']['auditRefs'], 'first-contentful-paint'));
console.log('speed-index');
const siScore = calculateScore(oldReportData['audits']['speed-index']['score'], newReportData['audits']['speed-index']['score'], getWeightage(newReportData['categories']['performance']['auditRefs'], 'speed-index'));
console.log('largest-contentful-paint');
const lcpScore = calculateScore(oldReportData['audits']['largest-contentful-paint']['score'], newReportData['audits']['largest-contentful-paint']['score'], getWeightage(newReportData['categories']['performance']['auditRefs'], 'largest-contentful-paint'));
console.log('interactive');
const ttiScore = calculateScore(oldReportData['audits']['interactive']['score'], newReportData['audits']['interactive']['score'], getWeightage(newReportData['categories']['performance']['auditRefs'], 'interactive'));
console.log('total-blocking-time');
const tbtScore = calculateScore(oldReportData['audits']['total-blocking-time']['score'], newReportData['audits']['total-blocking-time']['score'], getWeightage(newReportData['categories']['performance']['auditRefs'], 'total-blocking-time'));
console.log('cumulative-layout-shift-contentful-paint');
const clsScore = calculateScore(oldReportData['audits']['cumulative-layout-shift']['score'], newReportData['audits']['cumulative-layout-shift']['score'], getWeightage(newReportData['categories']['performance']['auditRefs'], 'cumulative-layout-shift'));


function calculateScore(oldScore, newScore, weight) {
    let score = 0;
    console.log('oldScore', (oldScore))
    console.log('newScore', (newScore))
    console.log('weight', weight)
    if (oldScore != newScore) {
        //console.log('weight',weight)
        score = parseFloat((((parseFloat(newScore.toFixed(2)) - parseFloat(oldScore.toFixed(2))) * weight)).toFixed(2));
    }
    //console.log('scorescorescore', score);
    return score;
}

function getWeightage(auditRefArray, catId) {
    const scoreObj = auditRefArray.filter(item => item.id === catId);
    return scoreObj[0]['weight'];
}
})();