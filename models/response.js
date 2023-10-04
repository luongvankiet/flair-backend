class Response {
  /**
   * Create a success response.
   * @param {object} data - The response data.
   * @param {string} message - An optional success message.
   */
  static success(data, message = "Success") {
    return {
      status: "success",
      data,
      message,
    };
  }

  /**
   * Create an error response.
   * @param {string} message - The error message.
   * @param {number} code - An optional error code (HTTP status code).
   */
  static error(message, code = 500) {
    return {
      status: "error",
      message,
      code,
    };
  }

  /**
   * Create a pagination response.
   * @param {object[]} data - The paginated data.
   * @param {number} total - Total number of items available.
   * @param {number} perPage - Number of items per page.
   * @param {number} currentPage - Current page number.
   * @param {string} message - An optional success message.
   */
  static paginatedSuccess(data, total, perPage, currentPage, message = "Success") {
    return {
      status: "success",
      data,
      message,
      pagination: {
        total,
        perPage,
        currentPage,
      },
    };
  }
}

module.exports = Response;
