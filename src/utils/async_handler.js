// Creating a higher order function ...
// Method -- 1
// requestHandler is a function passes in asyncHandler.

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export { asyncHandler };

// const asynchandler = (fn) => async (req, res, next) => {
//     try {
// await fn(req,res,next);
//     } catch (error) {
//         res.status(error.code || 500).json(
//             {
//                 success : false,
//                 message : error,message
//             }
//         )
//     }
// }

// METHOD -- 2

const asynchandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};
