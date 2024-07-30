#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
//import YAML from 'yaml';
import chalk from 'chalk';
import { wait, padNumber } from './constants.js';
import { csv2json } from 'json-2-csv';

(async () => {
    console.log(chalk.blueBright('Welcome to Lets Lighthouse Analysis Tool.'));

    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const outputDirPath = `./tests/${dateString}`;
    const jsonFilename = `${padNumber(date.getHours())}${padNumber(date.getMinutes())}${padNumber(date.getSeconds())}`;
    const outputCSVName = `${dateString}-${jsonFilename}.csv`;

    try {
        const configFile = readFileSync(`${process.cwd()}/crawler/lighthouse.csv`, 'utf8')
        const configData = csv2json(configFile, { trimHeaderFields: true, trimFieldValues: true });
        //console.log('configData',configData);
        //return;

        let count = 0;
        for (const element of configData) {
            //for (const morePages of element.items) {
            // Ensure output path exists
            const jsonDirPath = `${outputDirPath}/${element.vendor}/${element.slug}`;
            const jsonFilePath = `${jsonDirPath}/${jsonFilename}`;
            const csvPath = `${outputDirPath}/${element.vendor}/${outputCSVName}`;

            //console.log('jsonDirPathjsonDirPathjsonDirPath', outputDirPath, element.name, morePages.name, ' =======', jsonDirPath);
            console.log(chalk.redBright(`Currently Running for: ${element.vendor} => ${element.title}`));


            !existsSync(`${jsonDirPath}`) && mkdirSync(jsonDirPath, { recursive: true });
            if (count == 0) {
                writeFileSync(`${csvPath}`, `Page URL, Performance, Accessibility, Best Practices, SEO, Project, Page Name, Test Id`, { flag: 'a+' });
            }
            const options = {
                logLevel: 'error',
                output: 'json',
                onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
                //port: chrome.port
            };
            const chrome = await chromeLauncher.launch().then(async chrome => {
                options.port = chrome.port;
                try {
                    const runnerResult = await lighthouse(element.url, options, {
                        extends: 'lighthouse:default',

                    });
                    const reportInfo = runnerResult.report;
                    //writeFileSync('lhreport.html', reportInfo);
                    // Write output json
                    writeFileSync(`${jsonFilePath}.json`, reportInfo);
                    console.log(chalk.green('Report done for', runnerResult.lhr.finalDisplayedUrl));
                    //console.log(chalk.green('Performance score was', runnerResult.lhr.categories.performance.score * 100));
                    writeFileSync(`${csvPath}`, `\n${element.url}, ${Object.values(runnerResult.lhr.categories).map(c => `${Math.round(c.score * 100)}`).join(', ')}, ${element.vendor}, ${element.slug}, ${dateString}-${jsonFilename}`, { flag: 'a+' });
                    console.info(`\t${Object.values(runnerResult.lhr.categories).map(c => `${c.title}: ${Math.round(c.score * 100)}`).join(' | ')}\n`);
                    await wait(500);
                } catch (e) {
                    console.error("lighthouse", e);
                }
                // if (results) reportResults(results, runEnvironment, optionSet, chrome);

                chrome.kill();
                await wait(5000);

            });
            //}
            count++;

        }
    } catch (e) {
        console.log(chalk.redBright("Exception: ", e.message));
    }
})();