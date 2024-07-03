export const configExample = `
kind: config
metadata:
  name: main
  annotations:
    group: groupname
spec:
  selector:
    kind: null
    type: annotation
    value:
      group: groupname
  data:
    study_identifier: identifier1

`;
