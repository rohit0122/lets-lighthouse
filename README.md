# Lets Lighthouse

A beautiful tool to generate lighthouse for batch urls & compare them with ease.

## Installation

Use the package manager [npm](https://nodejs.org/en/download) to install Lets Lighthouse.

```bash
npm i lets-lighthouse
```

## Simple setup

To run this project, you will need to add the following configuration structure to config.yaml file
Create config.yaml file in parallel to your project's package.json file.

***Note: _Whitespace indentation is used to indicate nesting and overall structure._***
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


Now edit package.json and add following scripts to it.

```
"scripts": {
    "analysis": "lets-analysis",
    "compare": "lets-compare"
  }
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

npm run compare /2023-4-25/Dummy/Google/234733.json /2023-4-25/Dummy/Google/234547.json

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)