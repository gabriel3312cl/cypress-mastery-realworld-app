# Authentication
should redirect unauthenticated user to home page

should allow a visitor to sign-up, login, and logout

## Sign up
should display signup errors:
- when username is empty
- when username is taken
- when email is empty
- when email is taken
- when password is empty
- when password length < 4

## Sign in
should redirect to the home page after login

should remember a user for 30 days after login

should display login errors:
- when email is empty
- when wrong email format
- when password is empty
- when password length < 4
- when invalid user
- when invalid password for existing user