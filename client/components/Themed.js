import {
  StyleSheet,
  Text as ThemedText,
  View as ThemedView,
} from 'react-native';

export function View({ style, ...otherProps }) {
  return <ThemedView style={style} {...otherProps} />;
}

export function Text({ style, type = 'default', ...rest }) {
  const textStyle = [
    type === 'default' && styles.default,
    type === 'title' && styles.title,
    type === 'big' && styles.big,
    type === 'defaultSemiBold' && styles.defaultSemiBold,
    type === 'subtitle' && styles.subtitle,
    type === 'subtitle2' && styles.subtitle2,
    type === 'capitalised' && styles.capitalised,
    type === 'link' && styles.link,
    style,
  ];

  return <ThemedText style={textStyle} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'reg',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'mid',
  },
  title: {
    fontSize: 32,
    fontFamily: 'big',
    lineHeight: 32,
  },
  big: {
    fontSize: 42,
    fontFamily: 'big',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'mid',
  },
  subtitle2: {
    fontSize: 18,
    fontFamily: 'big',
  },
  capitalised: {
    fontSize: 18,
    fontFamily: 'reg',
    textTransform: 'capitalize',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#242529',
  },
});
