import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import CustomContainer from '../CustomContainer';

export const createScreen = (
    ScreenComponent,
    {
        scrollView = false,
        paddingTop = true,
        paddingBottom = true,
        horizantalPadding = false,
        backgroundColor,
        hideNavBar = false,
        customTitle,
    },
) => (props) => {
    const navigation = props.navigation;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        requestAnimationFrame(() => setLoading(false));
    }, []);
    useLayoutEffect(() => {
        if (customTitle) {
            navigation.setOptions({ title: customTitle });
        }
        if (hideNavBar) {
            navigation.setOptions({ headerShown: false });
        }
    }, [navigation]);

    return (
        <CustomContainer
            {...{
                backgroundColor,
                horizantalPadding,
                paddingBottom,
                paddingTop,
            }}>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={'blue'} />
                </View>
            ) : scrollView ? (
                <ScrollView>
                    <ScreenComponent {...props} />
                </ScrollView>
            ) : (
                <ScreenComponent {...props} />
            )}
        </CustomContainer>
    );
};
