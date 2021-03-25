import Joi from 'joi';
import { HttpRequestError } from 'exception/http-request-error';

export class Validator {
  /**
   * @param rules applied rules.
   */
  public constructor(private rules: Joi.ObjectSchema) {}

  /**
   * Validate data.
   *
   * @param data checked data.
   */
  public async validate(data: any) {
    let errors: any = {};

    try {
      const value = await this.rules.validateAsync(data, {
        abortEarly: false,
        stripUnknown: true,
      });

      return value;
    } catch (error) {
      errors =
        error.constructor.name === 'Error'
          ? this.formatError(error)
          : this.formatValidatorErrors(error);

      throw new HttpRequestError(400, errors);
    }
  }

  /**
   * Format Js error.
   *
   * @param error Js error.
   */
  private formatError(error: Error) {
    const formatedError: any = {};

    const [message, name] = error.message.split('(');

    formatedError[name.slice(0, -1)] = `"${name.slice(
      0,
      -1,
    )}" ${message.slice(0, -1)}`;

    return formatedError;
  }

  /**
   * Format Joi error.
   *
   * @param error Joi error.
   */
  private formatValidatorErrors(error: any) {
    const formatedErrors: any = {};

    for (const value of error.details) {
      value.path.forEach((p: string) => {
        if (formatedErrors[p]) {
          formatedErrors[p].push(value.message);
        } else {
          formatedErrors[p] = [value.message];
        }
      });
    }

    return formatedErrors;
  }
}
