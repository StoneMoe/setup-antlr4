const http = require('https');
const fs = require("fs").promises;
const oldfs = require("fs");
const core = require('@actions/core');
const github = require('@actions/github');

export const IS_WINDOWS = process.platform === 'win32';

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = oldfs.createWriteStream(dest, { flags: "wx" });

        const request = http.get(url, response => {
            if (response.statusCode === 200) {
                response.pipe(file);
            } else {
                file.close();
                oldfs.unlink(dest, () => {}); // Delete temp file
                reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`);
            }
        });

        request.on("error", err => {
            file.close();
            oldfs.unlink(dest, () => {}); // Delete temp file
            reject(err.message);
        });

        file.on("finish", () => {
            resolve();
        });

        file.on("error", err => {
            file.close();

            if (err.code === "EEXIST") {
                reject("File already exists");
            } else {
                oldfs.unlink(dest, () => {}); // Delete temp file
                reject(err.message);
            }
        });
    });
}

async function main(){
    try {
        const downloadUrl = core.getInput('download_url');
        // mkdir & cd
        if (IS_WINDOWS) {
            await fs.mkdir('C:\\Javalib', { recursive: true });
            process.chdir('C:\\Javalib');
        } else {
            process.chdir('/tmp');
        }
        // download
        console.log(`Download from ${downloadUrl}`);
        await download(downloadUrl, "antlr4.jar");
        // install
        if (IS_WINDOWS) {
            core.addPath("C:\\Javalib");
            core.exportVariable('CLASSPATH', ".;C:\\Javalib\\antlr4.jar;%CLASSPATH%");
            await fs.writeFile('antlr.bat', "java org.antlr.v4.Tool %*");
            await fs.writeFile("antlr4.bat", "java org.antlr.v4.Tool %*");
        } else {
            core.addPath("/tmp");
            core.exportVariable('CLASSPATH', '.:/tmp/antlr4.jar:$CLASSPATH');
            await fs.writeFile("antlr", "java -Xmx500M -cp \"/tmp/antlr4.jar:$CLASSPATH\" org.antlr.v4.Tool \"$@\"");
            await fs.writeFile("antlr4", "java -Xmx500M -cp \"/tmp/antlr4.jar:$CLASSPATH\" org.antlr.v4.Tool \"$@\"");
            await fs.chmod("antlr", 0o775);
            await fs.chmod("antlr4", 0o775);
        }
        console.log("Installed")
    } catch (error) {
        console.log("Install failed")
        console.trace(error);
        core.setFailed(error.message);
    }
}

main()