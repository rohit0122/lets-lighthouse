# Lets Lighthouse

A beautiful tool to generate lighthouse for batch urls & compare them with ease.

## Installation

Use the package manager [npm](https://nodejs.org/en/download) to install Lets Lighthouse.

```bash
npm i lets-lighthouse
```


## Simple setup

To run this project, you will need to add the following configuration structure to config.yaml file

```---
- name: Dummy
  items:
      - name: Google
        path: https://www.google.com/
- name: News
  items:
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

```python
# Execute the below command to start lighthouse analysis on multiple URLs
npm run analysis

# Compare 2 JSON files generated from the lighthouse.
npm run compare /2023-4-25/Dummy/Google/234733.json /2023-4-25/Dummy/Google/234547.json

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)