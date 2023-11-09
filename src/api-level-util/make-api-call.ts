import { APIRequestContext, APIResponse, Page } from '@playwright/test';

export default class RequestAPI {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }


    public async getAPICall(url: string, headers: { [key: string]: string }): Promise<APIResponse> {
        console.log()
        return await this.request.get(url, {
            headers: headers
        })

    }

    public async postAPICall(url: string, payload: string, headers: { [key: string]: string }): Promise<APIResponse> {
        return await this.request.post(url, {
            data: payload,
            headers: headers
        })
    }

    public async deleteAPICall(url: string, headers: { [key: string]: string }): Promise<APIResponse> {
        return await this.request.delete(url, {
            headers: headers
        })
    }

    public async putAPICall(url: string, payload: string, headers: { [key: string]: string }): Promise<APIResponse> {
        return await this.request.put(url, {
            data: payload,
            headers: headers
        })
    }
}