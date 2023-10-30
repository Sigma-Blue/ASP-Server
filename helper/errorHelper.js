/*** 
 
 // ERROR HANDLER :
  
    //* For Models and services:
    if(#error){
        return res
          .status(#code)
          .json{
            result: Success/Failure : #reason 
            error : #error.message
        }
    }

    //* For controllers:
    if (#error) {
		return res
        .status(#code)
        .json({
			  status: 'Failure: #error ',
			  message: `#error_msg : ${#error}`,
		});

    #code & #error_msg :
    500 -> Internal Server Error
    200 -> Successfully fetched all activities
    404 -> Activity not found
    401 -> Unauthorized
    201 -> Successfully created new activity
    400 -> Already Exists
    403 -> Forbidden response : Refused to Access
 
   Model ViewLayer Controller Architecture

 ***/
