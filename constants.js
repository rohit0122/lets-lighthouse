import { readFileSync } from 'fs';
import puppeteer from "puppeteer";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

const width = 1820;
const height = 1200;

export const wait = val => {
    return new Promise(resolve => setTimeout(resolve, val));
}

export const padNumber = number => {
    return `${number}`.padStart(2, '0');
}

export const calculateScore = (oldScore, newScore, weight) => {
    let score = 'No change detected.';
    /*console.log('oldScore', (oldScore))
    console.log('newScore', (newScore))
    console.log('weight', weight)*/
    if (oldScore != newScore) {
        //console.log('weight',weight)
        score = parseFloat((((parseFloat(newScore.toFixed(2)) - parseFloat(oldScore.toFixed(2))) * weight)).toFixed(2));
    }
    //console.log('scorescorescore', score);
    return score;
}

export const getWeightage = (auditRefArray, catId) => {
    const scoreObj = auditRefArray.filter(item => item.id === catId);
    return scoreObj[0]['weight'];
}

export const openLighthouseViewer = async (filePath, chromeArgs = []) => {
    const browser = await puppeteer.launch({
        headless: false,
        // Added chrome as custom path
        executablePath:
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        args: chromeArgs,
    });

    const page = await browser.newPage();
    await page.setViewport({
        width: 0,
        height: 0,
    });

    if (typeof filePath === "object" && filePath.previous && filePath.current) {
        await page.goto("https://googlechrome.github.io/lighthouse-ci/difftool/");

        await page.waitForSelector(".report-upload-box--base input[type=file]");
        const inputUploadHandleBase = await page.$(
            ".report-upload-box--base input[type=file]"
        );
        await inputUploadHandleBase.uploadFile(filePath.previous);

        await page.waitForSelector(".report-upload-box--compare input[type=file]");
        const inputUploadHandleTarget = await page.$(
            ".report-upload-box--compare input[type=file]"
        );
        await inputUploadHandleTarget.uploadFile(filePath.current);
    } else {
        await page.goto("https://googlechrome.github.io/lighthouse/viewer/");

        await page.waitForSelector("input[type=file]");
        const inputUploadHandle = await page.$("input[type=file]");
        await inputUploadHandle.uploadFile(filePath);
    }

    return {
        browser,
        page,
    };
};

export const opener = async (args, argv) => {
    let oldContent = JSON.parse(readFileSync(args.previous));
    let newContent = JSON.parse(readFileSync(args.current));

    if (oldContent.requestedUrl !== newContent.requestedUrl) {
        // throw new Error('Reports are not against the same request url');
        console.warn("Report test urls differ:");
        console.warn(
            `\tprevious: ${oldContent.requestedUrl}\n\tCurrent:${newContent.requestedUrl}\n`
        );
    }
    if (argv[2]) {
        const filePathObj = {
            previous: args.previous,
            current: args.current,
        };
        var { browser: mBrowser, page: mPage } = await openLighthouseViewer(
            filePathObj,
            [`--window-size=${Math.floor(width)},${height}`, `--window-position=0,0`]
        );
    } else {
        var { browser: lBrowser, page: lPage } = await openLighthouseViewer(
            args.previous,
            [
                `--window-size=${Math.floor(width / 2)},${height}`,
                `--window-position=0,0`,
            ]
        );

        var { browser: rBrowser, page: rPage } = await openLighthouseViewer(
            args.current,
            [
                `--window-size=${Math.floor(width / 2)},${height}`,
                `--window-position=${Math.floor(width / 2)},0`,
            ]
        );
    }

    prompt("Press Enter to continue...");

    try {
        if (argv[2]) {
            await mPage.close();
            await mBrowser.close();
        } else {
            await lPage.close();
            await rPage.close();
            await lBrowser.close();
            await rBrowser.close();
        }
    } catch (e) {
        console.log('Error while closing browser: ', e.message)
    }
};

export const getSanitizedDomain = (domainUrl) => {
    let result;
    let match;
    if (match = domainUrl.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
        result = match[1]
        if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
            result = match[1]
        }
    }
    return result.substr(0, result.indexOf('.'));
}
