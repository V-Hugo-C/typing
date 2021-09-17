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

return (<>
    <span className="matched"></span>
    <span className="remainder">{word}</span>
</>)}

const App = () => {


    const [tipedKeys,setTipedKeys]= useState(['']);
    const [validKeys,setValidKeys]= useState([]);

    const [word, setWord] = useState('');

    useEffect(()=>{
        setWord(getWord());
    });
    
    const handleKeyDown = (e) => {
        e.preventDefault();
        const { key } = e;

        setTipedKeys((prevTipedKeys) => {
            return[...prevTipedKeys,key].slice(maxTypedKeys*-1);
        });

        if(isValidKeys(key, word)){
            setValidKeys((prevTipedKeys) => {
                const isvalidLength = prevTipedKeys.length <= word.length;
                const isNextChar = isvalidLength && word[prevTipedKeys.length] === key;
                return isNextChar ? [...prevTipedKeys, key] : prevTipedKeys;
            });

        }

    }

    return (<div className="container" tabIndex="0" onKeyDown ={handleKeyDown} >
        <div className="validKeys">
            <Word word = {word} validKeys={validKeys}/>
        </div>
        <div className="tipedKeys">{tipedKeys ? tipedKeys.join(' '): null}</div>
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
