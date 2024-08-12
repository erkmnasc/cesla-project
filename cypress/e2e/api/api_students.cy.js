import { faker } from '@faker-js/faker';

describe('API de Student', () => {
    beforeEach(() => {
        cy.api_studentDeleteAll();
    });
    describe('Adiciona um novo usuário na API de Student com sucesso', () => {
        it('Deve criar um novo estudante com sucesso', () => {
            const project = {
                name: faker.company.name(),
                email: faker.internet.email(),
                academic_record: faker.datatype.number({ min: 1000000 }),
            };
            cy.api_studentCreateNewStudentWithSuccessfully(project)
                .then(response => {
                    expect(response.status).to.equal(201);
                    expect(response.body.name).to.equal(project.name);
                    expect(response.body.email).to.equal(project.email);
                    expect(response.body.academic_record).to.equal(project.academic_record);
                });
        });
    });
    describe('Lista todos os usuários criados com sucesso', () => {

        it('Deve retornar uma lista de estudantes', () => {
            const students = Array.from({ length: 10 }).map(() => ({
                name: faker.company.name(),
                email: faker.internet.email(),
                academic_record: faker.datatype.number({ min: 1000000 }),
            }));
            students.forEach(student => {
                cy.api_studentCreateNewStudentWithSuccessfully(student);
            });
            cy.api_studentGetAll().then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.gte(10);
            });
        });
    })
    describe('Atualiza um usuário existente na API de Student com sucesso', () => {
        it('Deve atualizar um estudante existente com sucesso', () => {
            const project = {
                name: faker.company.name(),
                email: faker.internet.email(),
                academic_record: faker.datatype.number({ min: 1000000 }),
            };

            cy.api_studentCreateNewStudentWithSuccessfully(project)
                .then(response => {
                    const studentId = response.body.id;
                    const updatedProject = {
                        name: faker.company.name(),
                        email: faker.internet.email(),
                        academic_record: faker.datatype.number({ min: 1000000 }),
                    };

                    cy.api_studentUpdate(studentId, updatedProject)
                        .then(updateResponse => {
                            expect(updateResponse.status).to.equal(200);
                            expect(updateResponse.body.name).to.equal(updatedProject.name);
                            expect(updateResponse.body.email).to.equal(updatedProject.email);
                            expect(updateResponse.body.academic_record).to.equal(updatedProject.academic_record);
                        });
                });
        });
    });
    describe('Deleta um usuário existente na API de Student com sucesso', () => {
        it('Deve deletar um estudante com sucesso', () => {
            const project = {
                name: faker.company.name(),
                email: faker.internet.email(),
                academic_record: faker.datatype.number({ min: 1000000 }),
            };

            cy.api_studentCreateNewStudentWithSuccessfully(project)
                .then(response => {
                    const studentId = response.body.id;
                    cy.api_studentDeleteAll(studentId)
                        .then(deleteResponse => {
                            expect(deleteResponse.status).to.equal(200);
                            cy.api_studentGetById(studentId, { failOnStatusCode: false })
                                .then(getResponse => {
                                    expect(getResponse.status).to.equal(404);
                                });
                        });
                });
        });
    });
});