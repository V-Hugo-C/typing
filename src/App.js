import React, { useEffect, useState } from 'react';
import wordList from './resources/words.json';
const maxTypedKeys = 30;

const getWord = () => {
    const index = Math.floor(Math.random()*wordList.length);
    const word = wordList[index];
    return word.toLowerCase();
}


const isValidKeys = (key, word) =>{
    if(!word) return false;
    const result = word.split('').includes(key);
    return result;
 }
const Word =({word,validKeys}) => {

    if(!word) return null;
    const joinedKeys = validKeys.join('');
    const matched = word.slice(0, joinedKeys.length);
    const remainder = word.slice(joinedKeys.length);

return (
<>
    <span className="matched">{matched}</span>
    <span className="remainder">{remainder}</span>
</>
    );
};

const App = () => {


    const [typedKeys,setTypedKeys]= useState([]);
    const [validKeys,setValidKeys]= useState([]);
    const [word, setWord] = useState('');

    useEffect(()=>{
        setWord(getWord());
    },[]);
    
    const handleKeyDown = (e) => {
        e.preventDefault();
        const { key } = e;

        setTypedKeys((prevTypedKeys) => {
            return[...prevTypedKeys,key].slice(maxTypedKeys*-1);
        });

        if(isValidKeys(key, word)){
            setValidKeys((prevTypedKeys) => {
                const isValidLength = prevTypedKeys.length <= word.length;
                const isNextChar = isValidLength && word[prevTypedKeys.length] === key;
                return isNextChar ? [...prevTypedKeys, key] : prevTypedKeys;
            });

        }

    }

    return (<div className="container" tabIndex="0" onKeyDown ={handleKeyDown} >
        <div className="validKeys">
            <Word word = {word} validKeys={validKeys}/>
        </div>
        <div className="typedKeys">{typedKeys ? typedKeys.join(' '): null}</div>
        <div className="completedWords">
            <ol>
                <li>da</li>
                <li>daa</li>
                <li>fas</li>
                <li>dasf</li>
                
            </ol>
        </div>
    </div>)
};

export default App;
