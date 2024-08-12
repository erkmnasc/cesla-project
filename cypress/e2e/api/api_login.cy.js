import { faker } from '@faker-js/faker';

describe('API de Login', () => {
    beforeEach(() => {
        cy.api_loginDeleteAll();
    });
    describe('Adiciona um novo usuário na API de login com sucesso', () => {
        it('Deve criar um novo estudante com sucesso', () => {
            const project = {
                email: faker.internet.email(),
                password: faker.internet.password(),
                token: faker.datatype.string(25),
                name: faker.company.name(),
                age: faker.datatype.number(100)
            };

            cy.api_loginCreateNewStudentWithSuccessfully(project)
                .then(response => {
                    expect(response.status).to.equal(201);
                    expect(response.body.email).to.equal(project.email);
                    expect(response.body.password).to.equal(project.password);
                    expect(response.body.token).to.equal(project.token);
                    expect(response.body.name).to.equal(project.name);
                    expect(response.body.age).to.equal(project.age);
                });
        });
    });
    describe('Lista todos os usuários criados com sucesso', () => {
        it('Deve retornar uma lista de estudantes', () => {
            const student1 = {
                email: faker.internet.email(),
                password: faker.internet.password(),
                name: faker.company.name(),
                age: faker.datatype.number(100)
            };
            const student2 = {
                email: faker.internet.email(),
                password: faker.internet.password(),
                name: faker.company.name(),
                age: faker.datatype.number(100)
            };
            cy.api_loginCreateNewStudentWithSuccessfully(student1);
            cy.api_loginCreateNewStudentWithSuccessfully(student2);
            cy.api_loginGetAll().then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.gte(2);
            });
        });
    })
    describe('Atualiza um estudante existente', () => {
        it('Deve atualizar um estudante existente', () => {
            const initialStudent = {
                email: faker.internet.email(),
                password: faker.internet.password(),
                token: faker.datatype.string(25),
                name: faker.company.name(),
                age: faker.datatype.number(100)
            };

            cy.api_loginCreateNewStudentWithSuccessfully(initialStudent)
                .then((createResponse) => {
                    const loginStudentId = createResponse.body.id;
                    const updatedLoginStudent = {
                        email: faker.internet.email(),
                        password: faker.internet.password(),
                        token: faker.datatype.string(25),
                        name: faker.company.name(),
                        age: faker.datatype.number({ min: 18, max: 65 })
                    };

                    cy.api_loginUpdate(loginStudentId, updatedLoginStudent)
                        .then((updateResponse) => {
                            expect(updateResponse.status).to.equal(200);
                            expect(updateResponse.body.email).to.equal(updatedLoginStudent.email);
                            expect(updateResponse.body.password).to.equal(updatedLoginStudent.password);
                            expect(updateResponse.body.token).to.equal(updatedLoginStudent.token);
                            expect(updateResponse.body.name).to.equal(updatedLoginStudent.name);
                            expect(updateResponse.body.age).to.equal(updatedLoginStudent.age);
                        });
                });
        });
    })
    describe('Deleta um estudante existente', () => {
        it('Deve deletar um estudante existente', () => {
            const student = {
                email: faker.internet.email(),
                password: faker.internet.password(),
                token: faker.datatype.string(25),
                name: faker.company.name(),
                age: faker.datatype.number(100)
            };

            cy.api_loginCreateNewStudentWithSuccessfully(student)
                .then((createResponse) => {
                    const loginStudentId = createResponse.body.id;
                    cy.api_loginDeleteAll(loginStudentId)
                        .then((deleteResponse) => {
                            expect(deleteResponse.status).to.equal(200);
                            cy.api_loginGetById(loginStudentId, { failOnStatusCode: false })
                                .then((getResponse) => {
                                    expect(getResponse.status).to.equal(404);
                                });
                        });
                });
        });
    });
});