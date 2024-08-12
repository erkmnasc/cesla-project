//API Commands da API de Login
Cypress.Commands.add('api_loginCreateNewStudentWithSuccessfully', project => {
    cy.request({
        method: 'POST',
        url: `/login/`,
        body: {
            email: project.email,
            password: project.password,
            token: project.token,
            name: project.name,
            age: project.age
        },
    })
})
Cypress.Commands.add('api_loginGetAll', () => {
    cy.request({
        method: 'GET',
        url: '/login/',
    })
})
Cypress.Commands.add('api_loginGetById', (loginStudentId, options = {}) => {
    cy.request({
        method: 'GET',
        url: `/students/${loginStudentId}`,
        ...options
    });
});
Cypress.Commands.add('api_loginUpdate', (loginStudentId, updatedLoginStudent) => {
    cy.request({
        method: 'PUT',
        url: `/login/${loginStudentId}`,
        body: {
            email: updatedLoginStudent.email,
            password: updatedLoginStudent.password,
            token: updatedLoginStudent.token,
            name: updatedLoginStudent.name,
            age: updatedLoginStudent.age
        }
    });
});
Cypress.Commands.add('api_loginDeleteAll', () => {
    cy.api_loginGetAll().then((response) => {
        const login = response.body;
        if (login.length > 0) {
            const deleteRequests = login.map(login => {
                return cy.request({
                    method: 'DELETE',
                    url: `/login/${login.id}`,
                });
            });
        }
    });
});

//API Commands da API de Students

Cypress.Commands.add('api_studentCreateNewStudentWithSuccessfully', project => {
    cy.request({
        method: 'POST',
        url: `/student/`,
        body: {
            name: project.name,
            email: project.email,
            academic_record: project.academic_record,
        },
    })
})
Cypress.Commands.add('api_studentGetAll', () => {
    cy.request({
        method: 'GET',
        url: '/student/',
    })
})
Cypress.Commands.add('api_studentGetById', (studentId, options = {}) => {
    cy.request({
        method: 'GET',
        url: `/students/${studentId}`,
        ...options
    });
});
Cypress.Commands.add('api_studentUpdate', (studentId, updatedStudent) => {
    cy.request({
        method: 'PUT',
        url: `/student/${studentId}`,
        body: {
            name: updatedStudent.name,
            email: updatedStudent.email,
            academic_record: updatedStudent.academic_record
        }
    });
});
Cypress.Commands.add('api_studentDeleteAll', () => {
    cy.api_studentGetAll().then((response) => {
        const login = response.body;
        if (login.length > 0) {
            const deleteRequests = login.map(login => {
                return cy.request({
                    method: 'DELETE',
                    url: `/student/${login.id}`,
                });
            });
        }
    });
});
