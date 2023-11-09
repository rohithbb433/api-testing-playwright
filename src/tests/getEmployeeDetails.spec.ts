// import { test, expect, APIResponse } from "@playwright/test";
// import GetEmployeeDetails from "../bean-util/get-employers-details";

// let getEmployeeDetails: GetEmployeeDetails;
// let apiResponse: APIResponse

// const referenceArray = [
//   'getUserDetails_200_id_1',
//   'getUserDetails_200_id_2',
//   'getUserDetails_200_id_3',
//   'getUserDetails_404'];


// referenceArray.forEach(reference => {
//   test.describe('Get_API_Validation_Post ', () => {
//     test(`Triggering Get call for referance ${reference}`, async ({ request }) => {
//       console.log("Started Test for the reference " + `${reference}` + "==========")
//       await test.step(`Initailse the bean reference`, async () => {
//         getEmployeeDetails = new GetEmployeeDetails(request, "api_details", `${reference}`);
//         await getEmployeeDetails.initialiseBean();
//       })

//       await test.step(`Trigger a get api call`, async () => {
//         apiResponse = await getEmployeeDetails.triggerAPICall();
//       })

//       await test.step(`Assertion validation`, async () => {
//         console.log((await apiResponse.body()).toString())
//         if (`${reference}`.includes("200")) {
//           expect(await (await apiResponse.json()).data.id.toString()).not.toBeNull();
//           expect(await (await apiResponse.json()).data.email.toString()).not.toBeNull();
//           expect(await (await apiResponse.json()).data.first_name.toString()).not.toBeNull();
//           expect(await (await apiResponse.json()).data.last_name.toString()).not.toBeNull();
//         } else if (`${reference}`.includes("404")) {
//           expect((await apiResponse.body()).toString()).toEqual("{}");
//         }
//         expect(await apiResponse.status().toString()).toEqual(await getEmployeeDetails.getStatusCode());
//       })
//       console.log("Ended Test for the reference " + `${reference}` + "==========")
//     })
//   })
// })


