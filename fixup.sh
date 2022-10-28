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
