import { useState , useEffect , useCallback } from 'react'

function actionByKey(key) {
    const keyActionMap = {
        KeyW: 'moveForward',
        KeyS: 'moveBackward',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
        Space: 'jump',
        Digit1: 'dirt',
        Digit2: 'grass',
        Digit3: 'glass',
        Digit4: 'wood',
        Digit5: 'log'
    }
    return keyActionMap[key];
}

export const useKeyboard = () => {
    const[Actions , setActions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        dirt: false,
        grass: false,
        glass: false,
        log: false,
        wood: false
    })

    const handleKeyDown = useCallback(e => {
        const action = actionByKey(e.code);
        if(action){
            setActions(prev =>{
                return ({
                    ...prev,
                    [action]: true
                })
            })
        }
    },[])

    const handleKeyUp = useCallback(e => {
        const action = actionByKey(e.code);
        if(action){
            setActions(prev =>{
                return ({
                    ...prev,
                    [action]: false
                })
            })
        }

    },[])


    useEffect(() =>{
        document.addEventListener('keydown' , handleKeyDown)
        document.addEventListener('keyup' , handleKeyUp)
        return () =>{
            document.removeEventListener('keydown' , handleKeyDown);
            document.removeEventListener('keyup' , handleKeyUp);
        }
    },[handleKeyDown , handleKeyUp])

    return Actions
}

// export default useKeyboard
