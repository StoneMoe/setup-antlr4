# setup-antlr4

This action install antlr4 tool for you.

Install `java` ([action/setup-java](https://github.com/actions/setup-java)) before this action step.

## Usage
```
# antlr v4.13.0
uses: StoneMoe/setup-antlr4@v4.13.0

# custom
uses: StoneMoe/setup-antlr4@v4.13.0
with:
  download_url: 'https://www.antlr.org/download/antlr-x.x.x-complete.jar'
```
for more version tags, see Releases.

## Inputs
### `download_url`
**Optional**, The URL of Antlr4 tools to download. Default value depends on the version tag you specify.

## Outputs
Nothing
