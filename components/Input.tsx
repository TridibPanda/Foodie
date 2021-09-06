import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";

const isHeight = Dimensions.get("window").height > 660;

const Input = (props:any) => {
  return (
    <View style={styles.input}>
      <TextInput
        {...props}
        placeholderTextColor="#000"
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        secureTextEntry={props.secureTextEntry}
        maxLength={props.maxLength}
        underlineColorAndroid="transparent"
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        textAlignVertical={props.textAlignVertical}
        style={{ ...styles.inputText, ...props.style }}
        placeholder={props.placeholder}
        onChangeText={props.onChange}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 5,
    borderRadius: 35,
  },
  inputText: {
    padding: isHeight ? 10 : 5,
    borderColor: "#000",
    color: "#000",
    borderWidth: 1,
    borderRadius: 35,
    backgroundColor: "transparent",
    fontSize: 17,
  },
});

export default Input;