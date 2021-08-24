import JsFileDownloader from 'js-file-downloader';
import * as exec from '@actions/exec';
import { chmod, writeFileSync } from 'fs';
const core = require('@actions/core');
const github = require('@actions/github');

export const IS_WINDOWS = process.platform === 'win32';

try {
    // cd
    if (IS_WINDOWS) {
        process.chdir('C:\\Javalib');
    } else {
        process.chdir('/usr/local/lib');
    }

    const downloadUrl = core.getInput('download_url');
    console.log(`Download from ${downloadUrl}`);
    new JsFileDownloader({
        url: downloadUrl,
        filename: "antlr4.jar"
    }).then(function () {
        // install
        if (IS_WINDOWS) {
            core.addPath("C:\\Javalib");
            core.exportVariable('CLASSPATH', ".;C:\\Javalib\\antlr4.jar;%CLASSPATH%");
            writeFileSync("antlr.bat", "java org.antlr.v4.Tool %*")
            writeFileSync("antlr4.bat", "java org.antlr.v4.Tool %*")
        } else {
            core.addPath("/usr/local/lib");
            core.exportVariable('CLASSPATH', '.:/usr/local/lib/antlr4.jar:$CLASSPATH');
            writeFileSync("antlr", "!#/bin/sh -l\njava -Xmx500M -cp \"/usr/local/lib/antlr4.jar:$CLASSPATH\" org.antlr.v4.Tool")
            chmod("antlr", "777")
        }
        
    }).catch(function (error) {
        console.trace(error);
        core.setFailed(error.message);
    });

} catch (error) {
    console.trace(error);
    core.setFailed(error.message);
}