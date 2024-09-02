import { useState } from "react";
import { createContext } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) =>{

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

    const delayPara = (index,nextWord) =>{
        setTimeout(function() {
            setResultData(prev=>prev+nextWord)
            
        },75*index);
    }

    const newChat = () =>{
        setLoading(false);
        setShowResult(false);
        
    }

    const onSent = async (prompt) =>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;

        try{
        if (prompt != undefined) {
            response= await run(prompt);
            setRecentPrompt(prompt);  
        }
        else{
            setPrevPrompts(prev=>[...prev,input]);
            setRecentPrompt(input);
            response = await run(input);
        }
        console.log("Response received:", response);

        // Check if the response is a function and call it if necessary
        if (typeof response === 'function') {
            response = response();
        }
        if (typeof response !== 'string') {
            throw new Error("Response is not a string");
        }
        
        let responseArray = response.split("**");
        let newResponse="";
        for (let i = 0; i < responseArray.length; i++) {
            if (i===0 || i%2!==1) {
                newResponse += responseArray[i];
                
            }
            else{
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
            
        }
        let newResponse2 = newResponse.split("*").join("</br>");
    
        // setResultData(newResponse2);
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ");
            
        }

    }catch (error) {
        console.error("Error processing the response:", error);
        setResultData("An error occurred while processing the response.");
      } finally {
        setLoading(false);
        setInput("");
      }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider