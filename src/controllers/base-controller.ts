
export class BaseController {
    handleError(err: string): string {
        throw new Error(err);
    }
}