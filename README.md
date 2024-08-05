# Lets Lighthouse 2.0

Verify your page performance and improve it before it's too late.

Ease of analysis, reporting & comparison is powered by the "Let's Lighthouse" tool and backed by "Lighthouse" i.e. a proven tool to validate your page performance.

This tool helps you to generate lighthouse reports for provided sitemap URL & compare them effortlessly.


## Note! 👋
⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️

The large size of the unpacked file for this project is a result of the presence of sample lighthouse JSON files located within the dist folder.

⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️


## Required Node & NPM version
```bash
node >= 20.5.1

npm  >=9.8.0

```
## Installation

Use the package manager [npm](https://nodejs.org/en/download) to install Lets Lighthouse.

```bash
npm i lets-lighthouse2.0
```

## Simple setup

### Below command will generate the project-required folders and furnish them with dummy data.

```bash
  npm run init
```

## Usage

To use this tool, you will need to crawl a website page by giving the actual sitemap URL path to the following command.
The command below retrieves the URLs and creates a file named *lighthouse.csv* in the *crawler* directory.

<img width="265" alt="image" src="https://github.com/user-attachments/assets/630f7922-1cd0-49ef-9dc9-73a8fa241f8c">


### Command 1

### Command 1.1 (Fetch all the URLs listed under sitemap.xml)
```bash
npm run crawler https://www.google.com/docs/sitemaps.xml
```

### Command 1.2 (Fetch only a few URLs listed under sitemap.xml)
```bash
npm run crawler https://www.google.com/docs/sitemaps.xml 10
```

### Command 2
```bash
# Execute the below command to start lighthouse analysis on
# multiple URLs(uses */crawler/lighthouse.csv*)

npm run analysis
```
The above command will create the tests folder under your project root
with all the analysis info as follows, you will also get a consolidated report
in CSV format under the tests folder refer to the screenshot:

<img width="234" alt="image" src="https://user-images.githubusercontent.com/6508575/234552270-8b7a93f1-419c-47e6-83b6-9f9ac4c28971.png">


### Command 3

```bash
# Compare 2 JSON files generated from the lighthouse.
# Refer to the JSON path from the above screenshot.

  npm run compare /2023-4-27/Dummy/Google/105453.json /2023-4-27/Dummy/Google/105658.json

```

### Command 4 - Compare 2 lighthouse reports for multiple URLs.

To use this command, you have to follow some steps:
1. Create an *input* folder to the root of the project, for example: 
<img width="165" alt="image" src="https://user-images.githubusercontent.com/6508575/234642413-50db8a42-f27f-45c5-b6f6-211b67d739c0.png">

2. Now, create *compareit.csv* file under *input* folder like as follows:
<img width="165" alt="image" src="https://user-images.githubusercontent.com/6508575/234642878-44138bb9-4b9a-4134-8ac3-c5f17988c917.png">

3. It is time to edit the *compareit.csv* file as follows:
<img width="577" alt="image" src="https://user-images.githubusercontent.com/6508575/234643104-01d54873-6ef0-4851-be53-a55aab64cdb2.png">

*Note:* Kindly follow the same header names, you can add Test IDs to compare, generated using command 1.

####  Execute the below command, this command will use [Lighthouse Report Viewer](https://googlechrome.github.io/lighthouse/viewer/)
```bash

  npm run compare-csv
```

####  Execute the below command if you want to use [Lighthouse Report Diff Tool](https://googlechrome.github.io/lighthouse-ci/difftool/)
```bash

  npm run compare-csv v2
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
