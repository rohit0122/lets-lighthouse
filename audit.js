#!/usr/bin/env node

//npm run compare /2023-4-25/Dummy/Google/234733.json /2023-4-25/Dummy/Google/234547.json
import fs from 'fs';
import { calculateScore, getWeightage } from './constants.js';
import chalk from 'chalk';

(async () => {
    //console.log('processprocessprocessprocess', process.argv)
    //let arguments = process.argv;
    const oldReportJson = process.argv[2] ? process.argv[2] : '';
    const newReportJson = process.argv[3] ? process.argv[3] : '';
    //console.log('oldReportJson', oldReportJson);

    const PATH_TO_TEST_FOLDER = './tests';

    try {
        const newReportData = JSON.parse(fs.readFileSync(PATH_TO_TEST_FOLDER + newReportJson, 'utf8'));
        const oldReportData = JSON.parse(fs.readFileSync(PATH_TO_TEST_FOLDER + oldReportJson, 'utf8'));


        console.log(chalk.blueBright('\n\tComparing lighthouse report for the URL:', oldReportData['requestedUrl'], '\n'));

        console.log(chalk.green('first-contentful-paint'));
        const fcpScore = calculateScore(oldReportData['audits']['first-contentful-paint']['score'], newReportData['audits']['first-contentful-paint']['score'], getWeightage(newReportData['categories']['performance']['auditRefs'], 'first-contentful-paint'));
        console.log(fcpScore, '\n');

        console.log(chalk.green('speed-index'));
        const siScore = calculateScore(oldReportData['audits']['speed-index']['score'], newReportData['audits']['speed-index']['score'], getWeightage(newReportData['categories']['performance']['auditRefs'], 'speed-index'));
        console.log(siScore, '\n');

        console.log(chalk.green('largest-contentful-paint'));
        const lcpScore = calculateScore(oldReportData['audits']['largest-contentful-paint']['score'], newReportData['audits']['largest-contentful-paint']['score'], getWeightage(newReportData['categories']['performance']['auditRefs'], 'largest-contentful-paint'));
        console.log(lcpScore, '\n');
        /*
        console.log(chalk.green('interactive'));
        const ttiScore = calculateScore(oldReportData['audits']['interactive']['score'], newReportData['audits']['interactive']['score'], getWeightage(newReportData['categories']['performance']['auditRefs'], 'interactive'));
        console.log(ttiScore, '\n');
        */

        console.log(chalk.green('total-blocking-time'));
        const tbtScore = calculateScore(oldReportData['audits']['total-blocking-time']['score'], newReportData['audits']['total-blocking-time']['score'], getWeightage(newReportData['categories']['performance']['auditRefs'], 'total-blocking-time'));
        console.log(tbtScore, '\n');

        console.log(chalk.green('cumulative-layout-shift-contentful-paint'));
        const clsScore = calculateScore(oldReportData['audits']['cumulative-layout-shift']['score'], newReportData['audits']['cumulative-layout-shift']['score'], getWeightage(newReportData['categories']['performance']['auditRefs'], 'cumulative-layout-shift'));
        console.log(clsScore, '\n');
    } catch (e) {
        console.log(chalk.redBright("Exception: ", e.message));
    }
})();