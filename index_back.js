import { playAudit } from 'playwright-lighthouse'
import playwright from 'playwright';
import lighthouse from 'lighthouse';
/*const lighthouseOptionsArray = [
    {
        extends: 'lighthouse:default',
        settings: {
            onlyCategories: ['accessibility'],
            emulatedFormFactor: 'desktop',
            output: ['html', 'json'],
        },
    },
    {
        extends: 'lighthouse:default',
        settings: {
            onlyCategories: ['accessibility'],
            emulatedFormFactor: 'mobile',
            output: ['html', 'json'],
        },
    },
]*/

  
(async ()=>{
    const browser = await playwright['chromium'].launch({
        args: ['--remote-debugging-port=9222'],
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://angular.io/');
    const url = page.url || page.url();
    console.log('urlurlurlurlurlurlurlurlurlurl==', url)
    const { comparison, results } = await lighthouse({
        url,
        /*thresholds: auditConfig.thresholds || defaultThresholds,
        opts: auditConfig.opts,
        config: auditConfig.config,
        reports: reportsConfig,
        cdpPort: auditConfig.port,*/
      });
console.log('comparison====', comparison);
console.log('results====', results);
/* await playAudit({
     page: page,
     thresholds: {
         performance: 0,
         accessibility: 0,
         'best-practices': 0,
         seo: 0,
         pwa: 0,
       },
       reports: {
         formats: {
             html: true, //defaults to false
         },
         name: `ligthouse-${new Date().toISOString()}`, //defaults to `lighthouse-${new Date().getTime()}`
         directory: `${process.cwd()}/lighthouse`, //defaults to `${process.cwd()}/lighthouse`
     },
     port: 9222,
 });
*/
 await browser.close();
})(); 

/*
function wait(val) {
    return new Promise(resolve => setTimeout(resolve, val));
}

function launchLighthouse(optionSet, opts, results) {
    return chromeLauncher
        .launch({ chromeFlags: opts.chromeFlags })
        .then(async chrome => {
            opts.port = chrome.port;
            try {
                results = await lighthouse(url, opts, optionSet);
            } catch (e) {
                console.error("lighthouse", e);
            }
            if (results) reportResults(results, runEnvironment, optionSet, chrome);
            await wait(500);
            chrome.kill();
        });
}

async function runLighthouseAnalysis() {
    let results;
    const opts = {
        chromeFlags: ["--no-sandbox", "--headless"]
    };
    for (const optionSet of lighthouseOptionsArray) {
        console.log("****** Starting Lighthouse analysis ******");
        await launchLighthouse(optionSet, opts, results);
    }
}

async function reportResults(results, runEnvironment, optionSet, chrome) {
    if (results.lhr.runtimeError) {
        return console.error(results.lhr.runtimeError.message);
    }
    //await writeLocalFile(results, runEnvironment, optionSet);
    printResultsToTerminal(results.lhr, optionSet);
    return passOrFailA11y(results.lhr, optionSet, chrome);
}

function printResultsToTerminal(results, optionSet) {
    const title = results.categories.accessibility.title;
    const score = results.categories.accessibility.score * 100;
    console.log('\n********************************\n');
    console.log(`Options: ${optionSet.settings.emulatedFormFactor}\n`);
    console.log(`${title}: ${score}`);
    console.log('\n********************************');
}

function passOrFailA11y(results, optionSet, chrome) {
    const targetA11yScore = 95;
    const { windowSize } = optionSet;
    const accessibilityScore = results.categories.accessibility.score * 100;
    if (accessibilityScore) {
        if (windowSize === 'desktop') {
            if (accessibilityScore < targetA11yScore) {
                console.error(`Target accessibility score: ${targetA11yScore}, current accessibility score ${accessibilityScore}`);
                chrome.kill();
                process.exitCode = 1;
            }
        }
        if (windowSize === 'mobile') {
            if (accessibilityScore < targetA11yScore) {
                console.error(`Target accessibility score: ${targetA11yScore}, current accessibility score ${accessibilityScore}`);
                chrome.kill();
                process.exitCode = 1;
            }
        }
    }
}*/