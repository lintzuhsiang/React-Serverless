import * as dynamoDBLib from "./libs/dynamodb-lib";
import {success,failure} from "./libs/response-lib";
import { fail } from "assert";




async function List(event,context){
    const params = {
        TableName:"Notes",
        KeyConditionExpression:"userId=:userId",
        ExpressionAttributeValues:{
            ":userId":event.requestContext.identity.cognitoIdentityId
        }
    }
    try{
        const result = await dynamoDBLib.call("query",params)
        console.log(result)
        return success(result.Items)
    }catch(e){
        console.log(e)
        return failure({status:false});
    }
}

export default List;