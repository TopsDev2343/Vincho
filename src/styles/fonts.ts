import {scale} from 'react-native-size-matters';

export const customFonts = {
  chanelRegular: 'ABChanelCorpo-Regular',
  regular: 'Helvetica',
  light: 'Helvetica-Light',
  bold: 'Helvetica-Bold',
  barlow_regular: 'Barlow-Regular',
};

export const Fonts = {
  //Regular Chanel

  verySmallRegChanel: {
    fontFamily: customFonts.chanelRegular,
    fontSize: scale(12),
    lineHeight: scale(24),
  },
  smallRegChanel: {
    fontFamily: customFonts.chanelRegular,
    fontSize: scale(14),
    lineHeight: scale(26),
  },
  mediumRegChanel: {
    fontFamily: customFonts.chanelRegular,
    fontSize: scale(16),
    lineHeight: scale(30),
  },
  largeRegChanel: {
    fontFamily: customFonts.chanelRegular,
    fontSize: scale(20),
    lineHeight: scale(39),
  },

  veryLargeRegChanel: {
    fontFamily: customFonts.chanelRegular,
    fontSize: scale(24),
    lineHeight: scale(39),
  },

  //Regular Helvetica

  verySmallReg: {
    fontFamily: customFonts.regular,
    fontSize: scale(12),
    // lineHeight: scale(20),
  },
  smallReg: {
    fontFamily: customFonts.regular,
    fontSize: scale(14),
    // lineHeight: scale(14),
  },
  mediumReg: {
    fontFamily: customFonts.regular,
    fontSize: scale(16),
    lineHeight: scale(18),
  },
  largeReg: {
    fontFamily: customFonts.regular,
    fontSize: scale(20),
    lineHeight: scale(24),
  },
  veryLargeReg: {
    fontFamily: customFonts.regular,
    fontSize: scale(24),
    lineHeight: scale(32),
  },

  //Light Helvetica

  verySmallLight: {
    fontFamily: customFonts.light,
    fontSize: scale(12),
    // lineHeight: scale(24),
  },
  smallLight: {
    fontFamily: customFonts.light,
    fontSize: scale(14),
    lineHeight: scale(20),
  },
  mediumLight: {
    fontFamily: customFonts.light,
    fontSize: scale(16),
    lineHeight: scale(30),
  },
  largeLight: {
    fontFamily: customFonts.light,
    fontSize: scale(20),
    lineHeight: scale(36),
  },
  veryLargeLight: {
    fontFamily: customFonts.light,
    fontSize: scale(24),
    lineHeight: scale(39),
  },

  //Bold Helvetica

  verySmallBold: {
    fontFamily: customFonts.bold,
    fontSize: scale(12),
    lineHeight: scale(24),
  },
  smallBold: {
    fontFamily: customFonts.bold,
    fontSize: scale(14),
    lineHeight: scale(26),
  },
  mediumBold: {
    fontFamily: customFonts.bold,
    fontSize: scale(16),
    lineHeight: scale(30),
  },
  largeBold: {
    fontFamily: customFonts.bold,
    fontSize: scale(24),
    lineHeight: scale(39),
  },
  veryLargeBold: {
    fontFamily: customFonts.bold,
    fontSize: scale(24),
    lineHeight: scale(39),
  },

  //Barlow
  smallRegBarlow: {
    fontFamily: customFonts.barlow_regular,
    fontSize: scale(14),
    lineHeight: scale(24),
  },
};
