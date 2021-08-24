# setup-antlr4

This action install antlr4 for you.  
Use `setup-java` to install Java 1.7 (aka Java 7) and later, before this step.

## Inputs

## `download_url`

**Required** The URL of Antlr4 tools to download. Default `"https://www.antlr.org/download/antlr-4.9.2-complete.jar"`.

## Outputs

Nothing

## Example usage

if v4.9.2 is ok with you:
```
uses: StoneMoe/setup-antlr4@v0.1
```

or set your own download_url:
```
uses: StoneMoe/setup-antlr4@v0.1
with:
  download_url: 'xxxxxxxxxxxxx'
```