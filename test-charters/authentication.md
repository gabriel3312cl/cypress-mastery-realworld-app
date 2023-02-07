# Authentication
should redirect unauthenticated user to home page

## Sign up
should redirect to home page after sign up as logged in

should display signup validation errors:
- when username is empty
- when email is empty
- when password is empty
- when password length < 4
- when wrong email format

should display error for taken username

should display error for taken email

## Sign in
should be able to login and logout

should display login validation errors:
- when email is empty
- when password is empty
- when password length < 4
- when wrong email format

should display error for invalid user

should display error for existing user when invalid password