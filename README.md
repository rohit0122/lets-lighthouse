# Lets Lighthouse

Verify your page performance and improve it before it's too late.

Ease of analysis, reporting & comparison is powered by the "Let's Lighthouse" tool and backed by "Lighthouse" i.e. a proven tool to validate your page performance.

This tool helps you to generate lighthouse reports for batch URLs & compare them effortlessly.

# Required Node & NPM version 
```bash
node >= 19.8.1

npm  >=9.5.1

```
## Installation

Use the package manager [npm](https://nodejs.org/en/download) to install Lets Lighthouse.

```bash
npm i lets-lighthouse
```

## Simple setup

### Now edit package.json and add following scripts to it.

```
"scripts": {
   "init": "lets-init",
    "analysis": "lets-analysis",
    "compare": "lets-compare",
    "compare-csv": "lets-compare-csv"
  }
```

### Below command will generate the project required folders and furnished them with dummy data.

```bash
  npm run init
```

## Heart of the project

To use this tool, you will need to edit the following configuration structure in config.yaml file
Create config.yaml file *(if not exits)* in parallel to your project's package.json file.

***Note: _In YAML file, Whitespace indentation is used to indicate nesting and overall structure._***
Here is the read about [YAML](https://docs.fileformat.com/programming/yaml/#syntax)

```
---
- name: Dummy
  items:
      - name: Google
        path: https://www.google.com/
- name: News
  items:
      - name: Times of India
        path: https://timesofindia.indiatimes.com/
      - name: Bhaskar
        path: https://www.bhaskar.com/
      - name: BBC News
        path: https://www.bbc.com/news
```


## Usage

### Command 1

```bash
# Execute the below command to start lighthouse analysis on
# multiple URLs(uses config.yaml)

  npm run analysis
```
The above command will create the tests folder under your project root
with all the analysis info like as follows, you will also get consolidated report
in CSV format under tests folder refer screenshot:

<img width="234" alt="image" src="https://user-images.githubusercontent.com/6508575/234552270-8b7a93f1-419c-47e6-83b6-9f9ac4c28971.png">


### Command 2

```bash
# Compare 2 JSON files generated from the lighthouse.
# Refer the json path from above screenshot.

  npm run compare /2023-4-27/Dummy/Google/105453.json /2023-4-27/Dummy/Google/105658.json

```

### Command 3 - Compare 2 lighthouse reports for multiple url.

In order to use this command, you have to follow some steps:
1. Create *input* folder to the root of the project, for example: 
<img width="165" alt="image" src="https://user-images.githubusercontent.com/6508575/234642413-50db8a42-f27f-45c5-b6f6-211b67d739c0.png">

2. Now, create *compareit.csv* file under *input* folder like as follows:
<img width="165" alt="image" src="https://user-images.githubusercontent.com/6508575/234642878-44138bb9-4b9a-4134-8ac3-c5f17988c917.png">

3. Its time to edit the *compareit.csv* file like as follows:
<img width="577" alt="image" src="https://user-images.githubusercontent.com/6508575/234643104-01d54873-6ef0-4851-be53-a55aab64cdb2.png">

*Note:* Kindly follow the same header names, you can add Test Id's to compare, generated using command 1.

####  Execute below command, this command will use [Lighthouse Report Viewer](https://googlechrome.github.io/lighthouse/viewer/)
```bash

  npm run compare-csv
```

####  Execute below command if you want to use [Lighthouse Report Diff Tool](https://googlechrome.github.io/lighthouse-ci/difftool/)
```bash

  npm run compare-csv v2
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)