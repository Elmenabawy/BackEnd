const Ajv=require("ajv").default;
const ajv=new Ajv();

const schema={
    "type":"object",
    "properties":{
        "name":{
            "type":"string",
            "pattern":"^[A-Z][a-z]*$"
        },
        "email":{
            "type":"string",
            "pattern":".+\@.+\..+"
        },
        "password":{
            "type":"string",
            "minLength":5
        },
        "phoneNumber": {
            "type": "string",
            "pattern": "^[0-9]{11}$"
          },
    "address": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9\\s,#-]*$"
    },
    "month1": {
        "type": "string",
        "pattern": "^(January|February|March|April|May|June|July|August|September|October|November|December|january|february|march|april|may|june|july|august|september|october|november|december)$"
      },
      
    "month2": {
        "type": "string",
        "pattern": "^(January|February|March|April|May|June|July|August|September|October|November|December|january|february|march|april|may|june|july|august|september|october|november|december)$"
      },
      "month3": {
          "type": "string",
          "pattern": "^(January|February|March|April|May|June|July|August|September|October|November|December|january|february|march|april|may|june|july|august|september|october|november|december)$"
        },
        "month4": {
            "type": "string",
            "pattern": "^(January|February|March|April|May|June|July|August|September|October|November|December|january|february|march|april|may|june|july|august|september|october|november|december)$"
          },
    },
    "required":["name","password","email","phoneNumber","address","month1","month2","month3","month4"]
}



module.exports=ajv.compile(schema)