const http = require('https');
const fs = require('fs');
import * as exec from '@actions/exec';
const core = require('@actions/core');
const github = require('@actions/github');

export const IS_WINDOWS = process.platform === 'win32';

try {
    // cd
    if (IS_WINDOWS) {
        fs.mkdir('C:\\Javalib', { recursive: true }, (err) => {
            if (err) throw err;
        });
        process.chdir('C:\\Javalib');
    } else {
        process.chdir('/tmp');
    }

    const downloadUrl = core.getInput('download_url');
    console.log(`Download from ${downloadUrl}`);
    const file = fs.createWriteStream("antlr4.jar");
    http.get(downloadUrl, function (response) {
        response.pipe(file);
    });
    // install
    if (IS_WINDOWS) {
        core.addPath("C:\\Javalib");
        core.exportVariable('CLASSPATH', ".;C:\\Javalib\\antlr4.jar;%CLASSPATH%");
        fs.writeFileSync("antlr.bat", "java org.antlr.v4.Tool %*")
        fs.writeFileSync("antlr4.bat", "java org.antlr.v4.Tool %*")
    } else {
        core.addPath("/tmp");
        core.exportVariable('CLASSPATH', '.:/tmp/antlr4.jar:$CLASSPATH');
        fs.writeFileSync("antlr", "!#/bin/sh -l\njava -Xmx500M -cp \"/tmp/antlr4.jar:$CLASSPATH\" org.antlr.v4.Tool")
        fs.chmod("antlr", 0o775, (err) => {
            if (err) throw err;
            console.log('The permissions for file "my_file.txt" have been changed!');
        });
    }
} catch (error) {
    console.trace(error);
    core.setFailed(error.message);
}