cat >dist/cjs/package.json <<!EOF
{
  "type": "commonjs",
  "sideEffects": false
}
!EOF

cat >dist/esm/package.json <<!EOF
{
  "type": "module",
  "sideEffects": false
}
!EOF

cat >dist/cjs/Stream/package.json <<!EOF
{
  "main": "./index.js",
  "typings": "./index.d.ts",
  "sideEffects": false
}
!EOF

cat >dist/cjs/AsyncStream/package.json <<!EOF
{
  "main": "./index.js",
  "typings": "./index.d.ts",
  "sideEffects": false
}
!EOF


cat >dist/esm/Stream/package.json <<!EOF
{
  "module": "./index.js",
  "typings": "./index.d.ts",
  "sideEffects": false
}
!EOF

cat >dist/esm/AsyncStream/package.json <<!EOF
{
  "module": "./index.js",
  "typings": "./index.d.ts",
  "sideEffects": false
}
!EOF

