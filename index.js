#!/usr/bin/env node

import fs from 'fs';
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import YAML from 'yaml';
import chalk from 'chalk';
import { wait, padNumber } from './constants.js';

(async () => {
    console.log(chalk.blueBright('Welcome to Lets Lighthouse Tool.'));

    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const outputDirPath = `./tests/${dateString}`;
    const jsonFilename = `${padNumber(date.getHours())}${padNumber(date.getMinutes())}${padNumber(date.getSeconds())}`;
    const csvPath = `${outputDirPath}/${dateString}-${jsonFilename}.csv`;

    try {
        const configFile = fs.readFileSync('./config.yaml', 'utf8')
        const configData = YAML.parse(configFile);
        //console.log('configData', configData[0].items);
        /*{ chromeFlags: ['--headless'] }*/
        let count = 0;
        for (const element of configData) {
            for (const morePages of element.items) {
                // Ensure output path exists
                const jsonDirPath = `${outputDirPath}/${element.name}/${morePages.name}`;
                const jsonFilePath = `${jsonDirPath}/${jsonFilename}`;
                //console.log('jsonDirPathjsonDirPathjsonDirPath', outputDirPath, element.name, morePages.name, ' =======', jsonDirPath);
                console.log(chalk.redBright(`Currently Running for: ${element.name} => ${morePages.name}`));


                await !fs.existsSync(`${jsonDirPath}`) && fs.mkdirSync(jsonDirPath, { recursive: true });
                if (count == 0) {
                    await fs.writeFileSync(`${csvPath}`, `Page URL, Performance, Accessibility, Best Practices, SEO, Page Name, Test Id`, { flag: 'a+' });
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
                        const runnerResult = await lighthouse(morePages.path, options, {
                            extends: 'lighthouse:default',

                        });
                        const reportInfo = await runnerResult.report;
                        //fs.writeFileSync('lhreport.html', reportInfo);
                        // Write output json
                        await fs.writeFileSync(`${jsonFilePath}.json`, reportInfo);
                        console.log(chalk.green('Report done for', runnerResult.lhr.finalDisplayedUrl));
                        //console.log(chalk.green('Performance score was', runnerResult.lhr.categories.performance.score * 100));
                        fs.writeFileSync(`${csvPath}`, `\n${morePages.path}, ${Object.values(runnerResult.lhr.categories).map(c => `${Math.round(c.score * 100)}`).join(', ')}, ${morePages.name}, ${dateString}-${jsonFilename}`, { flag: 'a+' });
                        console.info(`\t${Object.values(runnerResult.lhr.categories).map(c => `${c.title}: ${Math.round(c.score * 100)}`).join(' | ')}\n`);
                        await wait(500);
                    } catch (e) {
                        console.error("lighthouse", e);
                    }
                    // if (results) reportResults(results, runEnvironment, optionSet, chrome);

                    await chrome.kill();
                    await wait(5000);

                });
            }
            count++;

        }
    } catch (e) {
        console.log(chalk.redBright("Exception: ", e.message));
    }
})();