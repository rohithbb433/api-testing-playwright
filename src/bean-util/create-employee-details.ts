import { APIRequestContext, APIResponse, Page } from '@playwright/test';
import RequestAPI from '../api-level-util/make-api-call';
import ExcelReader from '../excel-utils/excel-reader';

export default class CreateEmployersDetails {
    private request: APIRequestContext;
    private sheetName: string;
    private reference: string;
    private excelReader: ExcelReader;
    private map: Map<string, string> = new Map();
    private actualPayload: any;

    constructor(request: APIRequestContext, sheetName: string, reference: string) {
        this.request = request;
        this.sheetName = sheetName;
        this.reference = reference;
        this.excelReader = new ExcelReader(sheetName, reference);
    }
    public async initialiseBeanAndGeneratePayload() {
        this.map = await this.excelReader.initialiseRowValue();
        let payloadReader = new ExcelReader("payload_details", await this.getPayloadReferance());
        let payloadMappper: Map<string, string> = await payloadReader.initialiseRowValue();
        let constructedPayload: string = await payloadMappper.get("payload");
        this.actualPayload = await JSON.parse(await JSON.stringify(await constructedPayload.replace("$NAME", await this.getName()).replace("$JOB", await this.getJob())))
    }

    public async getBaseUrl(): Promise<string> {
        return this.map.get("baseURL");
    }

    public async getUri(): Promise<string> {
        return this.map.get("uri");
    }

    public async getStatusCode(): Promise<string> {
        return this.map.get("statusCode");
    }

    public async getPayloadReferance(): Promise<string> {
        return this.map.get("payload_referance");
    }

    public async getName(): Promise<string> {
        return this.map.get("name");
    }

    public async getJob(): Promise<string> {
        return this.map.get("job");
    }

    public async triggerAPICall(): Promise<APIResponse> {
        console.log(this.actualPayload)
        return await new RequestAPI(this.request).postAPICall(await this.getBaseUrl() + await this.getUri(), this.actualPayload, await this.getHeaders("Dummy"))
    }

    public async getHeaders(token: string): Promise<{ [key: string]: string }> {
        let headers: { [key: string]: string };
        headers = {
            Authorization: token
        }
        return headers;
    }
}