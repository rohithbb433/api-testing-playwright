import { test, expect, APIResponse } from "@playwright/test";
import CreateEmployersDetails from "../bean-util/create-employee-details";

let createEmployersDetails: CreateEmployersDetails;
let apiResponse: APIResponse

const referenceArray = ['createUserDetails_200_Rohith',
  'createUserDetails_200_Vasu',
  'createUserDetails_200_Pradeep',
]


referenceArray.forEach(reference => {
  test.describe('Post_API_Validation_Post ', () => {
    test(`Triggering Post call for referance ${reference}`, async ({ request }) => {
      console.log("Started Test for the reference " + `${reference}` + "==========")
      await test.step(`Initailse the bean reference`, async () => {
        createEmployersDetails = new CreateEmployersDetails(request, "api_details", `${reference}`);
        await createEmployersDetails.initialiseBeanAndGeneratePayload();
      })

      await test.step(`Trigger a get api call`, async () => {
        apiResponse = await createEmployersDetails.triggerAPICall();
      })

      await test.step(`Assertion validation`, async () => {
        console.log((await apiResponse.body()).toString())
        if (`${reference}`.includes("200")) {
          expect(await (await apiResponse.json()).id.toString()).not.toBeNull();
          expect(await (await apiResponse.json()).createdAt.toString()).not.toBeNull();
        } else if (`${reference}`.includes("401")) {
          expect((await apiResponse.body()).toString()).toEqual("{}");
        }
        expect(await apiResponse.status().toString()).toEqual(await createEmployersDetails.getStatusCode());
      })
      console.log("Ended Test for the reference " + `${reference}` + "==========")
    })
  })
})

