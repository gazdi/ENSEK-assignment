<!-- omit from toc -->
# ENSEK ReSoTE

This repository contains the documentation for Task 01 of the ENSEK Remote Software Tester Exercise.

- [The Task](#the-task)
  - [01 Test Plan Creation](#01-test-plan-creation)
  - [02 Test Plan Execution](#02-test-plan-execution)
  - [03 REST API Testing](#03-rest-api-testing)
- [First Ideas](#first-ideas)
- [The Plan](#the-plan)
  - [Functional tests](#functional-tests)
    - [UI elements](#ui-elements)
      - [Homepage](#homepage)
      - [About](#about)
      - [Contact](#contact)
      - [Register](#register)
      - [Login](#login)
      - [Buy some energy](#buy-some-energy)
      - [Sell some energy](#sell-some-energy)
    - [Buy energy](#buy-energy)
    - [Register](#register-1)
    - [Login](#login-1)
- [Non-functional tests](#non-functional-tests)
  - [Performance tests](#performance-tests)
  - [Security tests](#security-tests)
  - [Exploratory tests](#exploratory-tests)

# The Task

## 01 Test Plan Creation

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

## 02 Test Plan Execution

> Once you have completed the creation of your approach we would then like you to execute one of your test  
> cases against the application.
>
> You will be required to record your results and test evidence for the test you execute, along with details of  
> any defects that you encounter during your testing.
>
> You can again choose to record the defects in any suitable format.

## 03 REST API Testing

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

# First Ideas

- Keep the test plan/strategy as simple as possible
- Keep bug reports as simple as possible (summary + screen)
- Automate a selection of planned UI tests
  - playwright
  - Selenium + xUnit (time permitting)
- Automate all REST API tests
  - playwright
  - RestSharp + xUnit (time permitting)
- Include exploratory bug bash
- Use html reports from playwright / xUnit as test evidence skeleton

# The Plan

## Functional tests

Verify site functionality.
Run the tests on major browser families, use desktop and mobile viewport sizes.

### UI elements

Verify that the UI elements are visible and testable.
Verify text contents where applicable.
Verify that the links / navigation buttons are visible and lead to where they meant to lead.
Ignore functionality beyond this scope in these tests.

#### Homepage

https://ensekautomationcandidatetest.azurewebsites.net/

- Logo, main heading
- Home
- About
- Contact
- Register
- Log in
- Find out more
- Buy some energy
- Sell some energy
- About us

#### About

https://ensekautomationcandidatetest.azurewebsites.net/Home/About

- Page title, description, footer
- Find out more button

#### Contact

https://ensekautomationcandidatetest.azurewebsites.net/Home/Contact

- Page title, description, footer

#### Register

https://ensekautomationcandidatetest.azurewebsites.net/Account/Register

- Page title, description, footer
- Register form

#### Login

https://ensekautomationcandidatetest.azurewebsites.net/Account/Login

- Page title, description, footer
- Local account
  - Heading
  - Login form
  - Register link
- External authentication
  - Heading
  - Description

#### Buy some energy

https://ensekautomationcandidatetest.azurewebsites.net/Energy/Buy

- Page title, description, footer
- Reset button
- Buy table
- Discount image
- Back navigation

#### Sell some energy

https://ensekautomationcandidatetest.azurewebsites.net/Energy/Sell

- Page title, footer
- Maintenance image

### Buy energy

Verify energy buying functionality.
Repeat the below cases with all available energy types (Gas, Nuclear, Electricity, Oil at the point of writing this).
Verify the contents on confirmation page: quantity bought, quantity left.
Go back to Buy Energy page and verify quantity left.

- Buy an available amount of energy
- Try to buy a more than available amount of energy when some is available
- Try to buy energy when none is available
- Try to buy a negative amount of energy when some is available
- Try to buy a non-integer amount of energy when some is available
- Try to buy a non-numeric amount of energy when some is available
- Try to buy 2^31 units of energy when some is available
- Set available amount to a negative number and try to buy a positive amount of energy - abandonned, no api support to prepare data
- Set available amount to a negative number and try to buy a negative amount of energy - abandonned, no api support to prepare data

### Register

Verify local user registration.
Verify confirmation/error message.
Test data for email address validation: https://en.wikipedia.org/wiki/Email_address#Examples
Note: wait for API response before giving up on UI side.

- Register user with new details
- Try to register without email
- Try to register without password
- Try to register without password confirmation
- Try to register with invalid email address
- Try to register with non-matching password and password confirmation
- Try to register with simple password
- Try to register a user with an already registered email

### Login

Verify login functionality.
Verify confirmation/error message.

- Login with currect details
- Try to login without email
- Try to login without password
- Try to login with valid email and invalid password
- Try to login with invalid email and valid password
- Try to login with invalid email and invalid password
- Verify the 'Remember me' functionality

# Non-functional tests

## Performance tests

This will be mostly done from API side with some UI torturing here.
Repeat UI actions in quick succession for a period of time.

- Navigation back and forth via links
- Navigation back and forth via browser actions
- Navigation back and forth via visiting URLs
- Reset test data
- Buy energy unit by unit

## Security tests

Get the system do it doesn't mean to.
Mostly exploratory in this timeframe.

- Look for plain text data in API requests and responses
- SQL injection
- Get raw error messages to find a lead to a breach

## Exploratory tests

Find issues typically not captured in structured testing.

- Layout across a variety of OS, browser, viewport size, and orientation
- Usability, general UX
- Consistency
- Spelling, grammar, phraseology
- Image contents
