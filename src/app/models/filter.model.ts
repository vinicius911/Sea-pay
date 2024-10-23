import { HttpParams } from "@angular/common/http"

export class Filter {
    page?: string
    limit?: string
    sortBy?: string
    order?: string

    constructor(params?: any) {
        Object.assign(this, params);
    }

    public toHttpParams(): HttpParams {
        var httpParams: HttpParams = new HttpParams();
        
        httpParams.append('page', this.page ?? '')
        httpParams.append('limit', this.limit ?? '')
        httpParams.append('sortBy', this.sortBy ?? '')
        httpParams.append('order', this.order ?? '')
        
        return httpParams
    }
}