#!/usr/bin/env node
import path from 'path';
import url from 'url';
import fs from 'fs';
import chalk from 'chalk';

(async () => {
    const currentFileDir = path.dirname(url.fileURLToPath(import.meta.url));
    console.log(chalk.blueBright(`\n\t √ Lets lighthouse setup initiated.`));
    //console.log('test folder', currentFileDir);
    const source = `${currentFileDir}/dist`;
    const target = './';
    try {
        await fs.cpSync(`${source}`, target, { recursive: true });

        console.log(chalk.blueBright("\t √ Project setup completed successfully."));
        console.log(chalk.blueBright(`\t √ config.yaml, tests & input folder with dummy entries has been generated at:`));
        console.log(chalk.bgBlueBright(`\t\t${path.resolve('')}`));
        console.log(chalk.blueBright("\t √ You can edit the config.yaml as per your requirement.\n"));
        console.log(chalk.bgGreenBright("\n\t Enjoy the Lets Lighthouse Tool & support us with your feedback.\n"));
    } catch (e) {
        console.log(chalk.redBright("\t x Lets lighthouse setup exited with exception:", e.message));
        console.log(chalk.bgRedBright("\tPlease try again.\n"));
    }
})();