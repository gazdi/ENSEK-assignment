<!-- omit from toc -->
# ENSEK ReSoTE

This repository contains the documentation for Task 01 of the ENSEK Remote Software Tester Exercise.

- [The Task](#the-task)
  - [01 Test Plan Creation](#01-test-plan-creation)
  - [02 Test Plan Execution](#02-test-plan-execution)
  - [03 REST API Testing](#03-rest-api-testing)
- [First Ideas](#first-ideas)

## The Task

### 01 Test Plan Creation

> We have provided you with a URL link to a test system which is to be used for this test:
> 
> [https://ensekautomationcandidatetest.azurewebsites.net/](https://ensekautomationcandidatetest.azurewebsites.net/)
> 
> Based on the above application, you are required to create an approach for the testing that you are going to  
> perform. This approach can be in a format of your choice and it must clearly outline what you will be testing.
> 
> From the day you receive this test, you have 48 hours to submit your work for assessment.​
> 
> Please send it to ADDNAME@ensek.co.uk. Any work committed after the deadline won’t be considered  
> towards the assessment.​
> 
> It is advised to use a publicly accessible Git repository (like GitHub) to commit and share any collections and  
> documents with us.

### 02 Test Plan Execution

> Once you have completed the creation of your approach we would then like you to execute one of your test  
> cases against the application.
> 
> You will be required to record your results and test evidence for the test you execute, along with details of  
> any defects that you encounter during your testing.
> 
> You can again choose to record the defects in any suitable format.

### 03 REST API Testing

> Please use the swagger document https://qacandidatetest.ensek.io/ and automate the below tests around
> the given endpoints, using a tool or framework of your choice:
> 
> Reset the test data
> 
> Buy a quantity of each fuel
> 
> Verify that each order from the previous step is returned in the /orders list with the expected details
> 
> Confirm how many orders were created before the current date
> 
> Automate any other validation scenarios that you would consider writing for this API
> 
> Record and share any defects identified.

## First Ideas

*   Keep the test plan/strategy as simple as possible
*   Keep bug reports as simple as possible (summary + screen)
*   Automate a selection of planned UI tests
    *   playwright
    *   Selenium + xUnit
*   Automate all REST API tests
    *   playwright
    *   RestSharp + xUnit
*   Include exploratory bug bash
*   Use html reports from playwright / xUnit as test evidence skeleton

