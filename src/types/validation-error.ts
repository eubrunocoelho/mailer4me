export interface ValidationErrorResponse {
	property: string;
	constraints:
		| {
				[type: string]: string;
		  }
		| undefined;
}

export interface ValidationFailure {
	message: string;
	errors: ValidationErrorResponse[];
}
