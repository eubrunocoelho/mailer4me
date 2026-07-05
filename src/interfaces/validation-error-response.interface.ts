export interface ValidationErrorResponse {
	property: string;
	constraints:
		| {
				[type: string]: string;
		  }
		| undefined;
}
