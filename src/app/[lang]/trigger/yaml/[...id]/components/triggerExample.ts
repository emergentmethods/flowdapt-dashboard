export const triggerExample = `
kind: trigger
metadata:
  name: schedule_workflow_name
  annotations:
    group: groupname
spec:
  type: schedule
  rule:
    - '*/5 * * * *'
  action:
    target: run_workflow
    parameters:
      workflow: workflow_name

`;
