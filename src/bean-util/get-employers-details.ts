import { APIRequestContext, APIResponse, Page } from '@playwright/test';
import RequestAPI from '../api-level-util/make-api-call';
import ExcelReader from '../excel-utils/excel-reader';

export default class GetEmployersDetails {
    private page: Page;
    private sheetName: string;
    private reference: string;
    private excelReader: ExcelReader;
    private map: Map<string, string> = new Map();

    constructor(page: Page, sheetName: string, reference: string) {
        this.page = page;
        this.sheetName = sheetName;
        this.reference = reference;
        this.excelReader = new ExcelReader(sheetName, reference);
    }
    public async initialiseBeanAndGeneratePayload() {
        this.map = await this.excelReader.initialiseRowValue();
    }

    public async getUrl(): Promise<string> {
        return this.map.get("url");
    }

    public async getUri(): Promise<string> {
        return this.map.get("uri");
    }
    public async triggerAPICall() {
        await new RequestAPI(this.page).getAPICall(await this.getUrl() + await this.getUri(), await this.getHeaders("Dummy"))
    }

    public async getHeaders(token: string): Promise<{ [key: string]: string }> {
        let headers: { [key: string]: string };
        headers = {
            Authorization: token
        }
        return headers;
    }
}