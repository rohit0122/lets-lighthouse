#!/usr/bin/env node

import { opener } from "./constants.js";
import csvToJson from "convert-csv-to-json";
import chalk from "chalk";

(async () => {
    const newLighthouseUI = process.argv[2] ? true : false;
    const PATH_TO_XLS = "./input/compareit.csv";
    const PATH_TO_TEST_FOLDER = "./tests";

    try {
        const rows = await csvToJson
            .fieldDelimiter(",")
            .getJsonFromCsv(PATH_TO_XLS);
        //console.log('rowsrows', rows);
        for (const row of rows) {
            let projectName = row.Project.trim();
            let pageName = row.PageName.trim();
            let lastTestId = row.TestId.trim();
            let compareWithTestId = row.CompareWithTestId.trim();
            console.log(chalk.greenBright("\n\tCurrently Running for: ",pageName));
            const pageFolderPath = `${projectName}/${pageName}`;
            const oldReportJsonFile = `${PATH_TO_TEST_FOLDER}/${lastTestId.substr(
                0,
                lastTestId.lastIndexOf("-")
            )}/${pageFolderPath}/${lastTestId.substr(
                lastTestId.lastIndexOf("-") + 1
            )}.json`;
            const newReportJsonFile = `${PATH_TO_TEST_FOLDER}/${compareWithTestId.substr(
                0,
                lastTestId.lastIndexOf("-")
            )}/${pageFolderPath}/${compareWithTestId.substr(
                compareWithTestId.lastIndexOf("-") + 1
            )}.json`;
            //console.log('\noldReportJsonFile', oldReportJsonFile)
            //console.log('newReportJsonFile', newReportJsonFile)
            await opener(
                { previous: oldReportJsonFile, current: newReportJsonFile },
                process.argv
            );
        }
    } catch (e) {
        console.log(chalk.redBright("Exception: ", e.message));
    }
})();
