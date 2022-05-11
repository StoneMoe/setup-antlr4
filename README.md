# setup-antlr4

This action install antlr4 tool for you.

Install `java` ([action/setup-java](https://github.com/actions/setup-java)) before this action step.

## Inputs
### `download_url`
**Required**, The URL of Antlr4 tools to download. Default `"https://www.antlr.org/download/antlr-4.9.2-complete.jar"`.

## Outputs
Nothing

## Usage
antlr v4.9.2:
```
uses: StoneMoe/setup-antlr4@v2
```

antlr v4.10.1:
```
uses: StoneMoe/setup-antlr4@v4.10.1
```

custom:
```
uses: StoneMoe/setup-antlr4@v2
with:
  download_url: 'https://www.antlr.org/download/antlr-x.x.x-complete.jar'
```
