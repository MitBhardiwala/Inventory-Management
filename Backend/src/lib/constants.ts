const API_MESSAGES = {
  USER: {
    CREATE_SUCCESS: "User created successfully",
    CREATE_ERROR: "Error in creating user",
    ALREADY_EXISTS: "User with same email already exists",
  },

  PRODUCT: {
    CREATE_SUCCESS: "Product created successfully",
    CREATE_ERROR: "Error in creating Product",

    ALREADY_EXISTS: "proudct  with same name already exists",
  },

  DATA: {
    FETCH_SUCCESS: "Data fetched successfully",
    FETCH_ERROR: "Error in fetching data",

    UPDATE_SUCCESS: "Data updated successfully",
    UPDATE_ERROR: "Error in updating data",

    DELETE_SUCCESS: "Data deletd successfully",
    DELETE_ERROR: "Error in deleting data",

    NOT_FOUND: "No data found",
    ID_NOT_FOUND: "Id not found",
  },

  VALIDATION: {
    JOI_ERROR: "Joi validation error",
  },

  ORDER: {
    CREATE_SUCCESS: "Order created successfully",
    CREATE_ERROR: "Error in creating order",

    ALREADY_EXISTS: "proudct  with same name already exists",

    NO_STOCK_AVAILABLE: "No stock is available",
  },

  INTERNAL_SERVER_ERROR: "Internal server error",
};

export default API_MESSAGES;
