import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [activeItem, setActiveItem] = useState(false);
    const [allItemsFromAssets, doNotUse] = useState([
        {
            src: require('../assets/images/rocks.png'),
            name:"rocks"
        },
        {
            src: require('../assets/images/cheese.png'),
            name:"cheese"
        },
        {
            src: require('../assets/images/scream.png'),
            name:"scream"
        },
    ]);

    useEffect(() => {
        // Getting permission from user
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        // Side effect
        getBarCodeScannerPermissions();
    }, []);

    ////////////////////////////////
    // Handling user event
    ////////////////////////////////
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // TODO: Modal or alert?
        //alert(`Bar code with type ${type}\nData ${data} has been scanned!`);
        setActiveItem(data);
        console.log(data);
    };

    ////////////////////////////////
    // Conditional rendering
    ////////////////////////////////
    if (hasPermission === null) {
        return <Text>ARtQuest is asking for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>Permission denied</Text>;
    }
    

    ////////////////////////////////////////////////////
    // Returning the current scanned image require ID
    ////////////////////////////////////////////////////
    const scannedImage = allItemsFromAssets.find(item => item.name == activeItem).src
    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <TouchableOpacity onPress={() => setScanned(false)} style={styles.itemContainer} >
                    {/* require does not work with dynamic import */}
                    <Image 
                        source={ scannedImage }
                        style={{width: 150, height: 150}}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    artifact: {
        backgroundColor: 'red',
        width: '50%',
        height: '50%',
    }
});
