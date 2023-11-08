import { test, expect } from "@playwright/test";
import ExcelReader from "../excel-utils/excel-reader";

let _id: any;

test("Get_API_Validation_Post", async ({ request }) => {
  let excelReader = new ExcelReader("Sheet1", "6");
  await excelReader.initialiseRowValue();
  const _response = await request.post("https://reqres.in/api/users", {
    data: {
      "name": "Rohith",
      "job": "Automation_Testing"
    }
  });
  console.log(await _response.json());
  console.log(await _response.status().toString());
  _id = await _response.json()
  console.log(await _id.id.toString());
})