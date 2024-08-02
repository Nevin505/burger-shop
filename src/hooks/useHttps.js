import { useCallback, useEffect, useState } from "react"

const sendHttpRequest=async(url,condfig)=>{
    try{
        const response=await fetch(url,condfig);
        const resData=await response.json()
        if(!response.ok){
            throw new Error(resData.message || "Something Went Wrong,Failed to Send Request")
        }
        return resData
    }
    catch(error){

    }
}

export const useHttp=(url,config,intialData)=>{

     const[isLoading,setisLoading]=useState(false);
     const[result,setResult]=useState(intialData);
     const[error,setError]=useState();
     const sendRequest=  useCallback(async function sendRequest(){
            try{
              setisLoading(true)
              const resData= await  sendHttpRequest(url,config);
              console.log(resData)
              setResult(resData)
            }
            catch(error){
                setError(error.message || "Something Went Wrong,Failed to Send Request")
              }
              finally{
                  setisLoading(false)
            }
           
     },[url,config]);

     useEffect(()=>{
        if((config && (config.method==='GET' ||!config.method ) )|| !config)
        {
            sendRequest();

        }
     },[sendRequest,config])

     return {sendRequest,isLoading,result,error}
}