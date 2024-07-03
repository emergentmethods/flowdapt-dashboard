export const openMeteoWorkflowExample = `
kind: workflow
metadata:
  name: example_workflow
  annotations:
    group: example
spec:
  stages:
    - type: simple
      target: example_workflow.main.stage1
      name: stage1
      description: ''
      version: ''
      depends_on: []
      options: {}
      resources: {}
      priority: null
    - type: simple
      target: example_workflow.main.stage1
      name: stage2
      description: ''
      version: ''
      depends_on:
        - stage1
      options: {}
      resources: {}
      priority: null

`;
