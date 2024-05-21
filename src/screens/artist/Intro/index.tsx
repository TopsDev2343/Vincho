import React, {useRef, useState} from 'react';
import {ScrollView, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Colors} from '~/styles/colors';
import {intro1, intro2, intro3} from '~/assets/images';
import {Strings} from '~/assets/strings/index';
import {CustomButton, CustomContainer, IntroItem} from '~/components';
import {storageHelper} from '~/utils/storageHelper';
import {StorageKeys} from '~/constants/storageKeys';
import {introBack1, introBack2, introBack3} from '~/assets/images/index';
import {verticalScale} from 'react-native-size-matters';

const {width} = Dimensions.get('window');

const Intro = ({navigation}: {navigation: any}) => {
  const scrollRef = useRef<any>(null);
  const saveInStorage = new storageHelper();
  const [activeIndex, setActiveIndex] = useState(0);

  function nextSlide(indexValue: number) {
    if (indexValue === 2) {
      saveInStorage.singleSave(
        'shown',
        StorageKeys.INTRO_SHOW,
        navigation.replace('ArtistStack'),
      );
    } else {
      scrollRef.current?.scrollTo({
        x: (indexValue + 1) * width,
        y: 0,
        animated: true,
      });
      setActiveIndex(indexValue + 1);
    }
  }

  return (
    <LinearGradient style={{flex: 1}} colors={Colors.gradientBack}>
      <CustomContainer>
        <ScrollView
          style={{flex: 1}}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          ref={scrollRef}
          onScrollEndDrag={() => {
            nextSlide(activeIndex);
          }}>
          <IntroItem
            img={intro1}
            imgBack={introBack1}
            imgWidth={verticalScale(370)}
            title={Strings.introTitle1}
            body={Strings.introBody1}
            activeIndex={0}
            onClick={() => nextSlide(0)}
            writer={Strings.introWriter1}
          />
          <IntroItem
            img={intro2}
            imgBack={introBack2}
            imgWidth={360}
            title={Strings.introTitle2}
            body={Strings.introBody1}
            activeIndex={1}
            onClick={() => nextSlide(1)}
            writer={''}
          />
          <IntroItem
            img={intro3}
            imgBack={introBack3}
            imgWidth={360}
            title={Strings.introTitle3}
            body={Strings.introBody1}
            activeIndex={2}
            onClick={() => nextSlide(2)}
            writer={''}
          />
        </ScrollView>
        <CustomButton
          containerStyle={{justifyContent: 'flex-end', marginBottom: 20}}
          title={activeIndex === 2 ? Strings.getStart : Strings.next}
          titleColor={Colors.primary}
          backColor={Colors.introBtnBack}
          onPress={() => {
            nextSlide(activeIndex);
          }}
        />
      </CustomContainer>
    </LinearGradient>
  );
};

export default Intro;
