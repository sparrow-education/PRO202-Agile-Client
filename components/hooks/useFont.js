import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

////////////////////////////////////////////////////////////////////////
// Loading font from assets asynchronously and will load the font
// before the application starts
export default function useFont() {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    useEffect(() => {
        async function loadFont() {
            try {
                await Font.loadAsync({

                    'Munch-Bold': require('../../assets/fonts/GirottMunch-Bold.ttf'),
                    'Munch-Backslant': require('../../assets/fonts/GirottMunch-BoldBackslant.ttf'),
                    'Montserrat': require('../../assets/fonts/Montserrat-VariableFont_wght.ttf'),
                    'GirottMunch-BoldSlant': require('../../assets/fonts/GirottMunch-BoldSlant.ttf'),
                    'Helvetica': require('../../assets/fonts/Helvetica-Font/Helvetica.ttf'),
                    'Helvetica-Bold': require('../../assets/fonts/Helvetica-Font/Helvetica-Bold.ttf'),
                    'Munch-BoldSlant': require('../../assets/fonts/GirottMunch-BoldSlant.ttf'),
                    'HelveticaNeue': require('../../assets/fonts/HelveticaNeueMedium.ttf'),
                });
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoadingComplete(true);
            }
        }

        loadFont();
    }, []);

    return isLoadingComplete;
}
