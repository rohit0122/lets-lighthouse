#!/usr/bin/env node

import { CheerioCrawler, Configuration, Sitemap, Dataset } from 'crawlee';
import { cpSync, existsSync, mkdirSync, rmdirSync, rmSync, writeFileSync } from 'fs';
import slug from 'slug';
import { getSanitizedDomain } from './constants.js';
import chalk from 'chalk';


var args = process.argv.slice(2);
var siteMapUrl = 'https://crawlee.dev/sitemap.xml';
var maxUrlsToFetch = 0;
if (args.length) {
    siteMapUrl = args[0];
}
if (args.length && args[1]) {
    maxUrlsToFetch = parseInt(args[1]);
}
console.log(chalk.greenBright('Crawler started to read sitemap URL.'));
console.log(chalk.blueBright('Sitemap URL to Execute:::::::::::', siteMapUrl));

const outputDir = `${process.cwd()}/crawler/`;
const testResultsFilePath = `${outputDir}lighthouse.csv`;
const storageFilePath = `${process.cwd()}/storage/key_value_stores/default/lighthouse.csv`;

// Create a BasicCrawler - the simplest crawler that enables
// users to implement the crawling logic themselves.
if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
}

if (existsSync(testResultsFilePath)) {
    rmSync(testResultsFilePath, { recursive: true, force: true });
}

// Create an instance of the CheerioCrawler class - a crawler
// that automatically loads the URLs and parses their HTML using the cheerio library.
const crawler = new CheerioCrawler({
    // The crawler downloads and processes the web pages in parallel, with a concurrency
    // automatically managed based on the available system memory and CPU (see AutoscaledPool class).
    // Here we define some hard limits for the concurrency.
    minConcurrency: 1,
    maxConcurrency: 1,

    // On error, retry each page at most once.
    maxRequestRetries: 1,

    // Increase the timeout for processing of each page.
    requestHandlerTimeoutSecs: 30,

    // Limit to 10 requests per one crawl
    maxRequestsPerCrawl: maxUrlsToFetch,

    // This function will be called for each URL to crawl.
    async requestHandler({ request, $ }) {
        console.log(chalk.greenBright(`Processing the URL ${request.url}...`));

        // Extract data from the page using cheerio.
        const title = $('title').text().trim();
        //writeFileSync(testResultsFilePath, json2csv({ title, url: request.loadedUrl, slug: slug(title), vendor:  await getSanitizedDomain(request.loadedUrl)}), { flag: 'a+' });
        await Dataset.pushData({ title, url: request.loadedUrl, slug: slug(title).trim(), vendor: await getSanitizedDomain(request.loadedUrl) });
        await Dataset.exportToCSV('lighthouse');
    },

    // This function is called if the page processing failed more than maxRequestRetries + 1 times.
    failedRequestHandler({ request }) {
        console.log(chalk.redBright(`Request ${request.url} failed twice.`));
    },
    errorHandler({ request, error }) {
        console.log(chalk.redBright(`Exception ${request.url} failed with error ${error}.`));
    }
});

const { urls } = await Sitemap.load(siteMapUrl);
// Run the crawler and wait for it to finish.
await crawler.run(urls);
console.log(chalk.blueBright('Generating CSV.'));
cpSync(storageFilePath, testResultsFilePath);
console.log(chalk.blueBright('CSV file generate at location: ', testResultsFilePath));
console.log(chalk.green('Crawler finished execution.'));