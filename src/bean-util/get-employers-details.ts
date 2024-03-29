import { APIRequestContext, APIResponse, Page } from '@playwright/test';
import RequestAPI from '../api-level-util/make-api-call';
import ExcelReader from '../excel-utils/excel-reader';

export default class GetEmployeeDetails {
    private request: APIRequestContext;
    private sheetName: string;
    private reference: string;
    private excelReader: ExcelReader;
    private map: Map<string, string> = new Map();

    constructor(request: APIRequestContext, sheetName: string, reference: string) {
        this.request = request;
        this.sheetName = sheetName;
        this.reference = reference;
        this.excelReader = new ExcelReader(sheetName, reference);
    }
    public async initialiseBean() {
        this.map = await this.excelReader.initialiseRowValue();
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

    public async triggerAPICall(): Promise<APIResponse> {
        return await new RequestAPI(this.request).getAPICall(await this.getBaseUrl() + await this.getUri(), await this.getHeaders("Dummy"))
    }

    public async getHeaders(token: string): Promise<{ [key: string]: string }> {
        let headers: { [key: string]: string };
        headers = {
            Authorization: token
        }
        return headers;
    }
}