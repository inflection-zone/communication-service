// import request from 'supertest';
// import { expect } from 'chai';
// import Application from '../src/app';
// import { describe, it } from 'mocha';
// import { getTestData, setTestData } from '../init';
// import { faker } from '@faker-js/faker';

// const infra = Application.instance();

// ///////////////////////////////////////////////////////////////////////////

// describe('01 - Messaging Service tests', function () {

//     var agent = request.agent(infra._app);

//     it('25:01 -> Get document type', function (done) {
//         agent
//             .get(`/api/v1/patient-documents/types/`)
//             .set('Content-Type', 'application/json')
//             .set('x-api-key', `${process.env.TEST_API_KEY}`)
//             .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
//             .expect(response => {
//                 expect(response.body).to.have.property('Status');
//                 expect(response.body.Status).to.equal('success');
//             })
//             .expect(200, done);
//     });

// });

// ///////////////////////////////////////////////////////////////////////////

// export const loadPatientDocumentUpdateModel = async (
// ) => {
//     const model = {
//         MedicalPractitionerUserId: getTestData("DoctorUserId"),
//         DocumentType: faker.lorem.words(3),
//         MedicalPractionerRole: faker.lorem.word(),
//         RecordDate: faker.date.anytime()

//     };
//     setTestData(model, "PatientDocumentUpdateModel");
// };

// export const loadRenamePatientDocumentUpdateModel = async (
// ) => {
//     const model = {
//         NewName: faker.system.commonFileName('jpg')

//     };
//     setTestData(model, "RenamePatientDocumentUpdateModel");
// };

// function loadPatientDocumentQueryString() {
//     //This is raw query. Please modify to suit the test
//     const queryString = '';
//     return queryString;
// }
