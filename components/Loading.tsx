import React from 'react';
import {
	View,
	StyleSheet,
	Modal,
	ActivityIndicator,
} from 'react-native';

const Loading = (props: any) => {

	return (
		<Modal visible={props.visible} transparent={true} animationType="slide">
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color='#ba45ac' />
			</View>
		</Modal>
	)

}

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default Loading;