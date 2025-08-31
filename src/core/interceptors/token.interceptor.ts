import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../environments/environment";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const token = environment.apiKey;
    if (req.url.includes(environment.apiBasePath)) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
        return next(cloned);
    }
    return next(req)
};