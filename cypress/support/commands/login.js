const login = ((email, password) => {

    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/users/login',
        body: {
            user: {
                email: email,
                password: password
            }
        }
    }).then((response) => {
        const { email, username, bio, image, token } = response.body.user;
        const loggedUser = {
            headers: {
                Autherization: `Token ${token}`,
            },
            isAuth: true,
            loggedUser: {
                email,
                username,
                bio,
                image,
                token,
            },
        };
        window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    });
        
});

Cypress.Commands.add('login', login);