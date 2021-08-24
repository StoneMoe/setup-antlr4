## Build Reminder

```bash
npm i -g @vercel/ncc
npm i
ncc build index.js --license licenses.txt
git add action.yml dist/index.js
git commit -m "whatever"
git tag -a -m "whatever" v0.1
git push --follow-tags
```

Ref: <https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action>