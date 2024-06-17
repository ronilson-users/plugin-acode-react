import Box from './Box.js';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Raj() {
	const styles = StyleSheet.create({
		container: {
			// Estilos aqui
		},
	});

	return (
		<View style={styles.container}>
			{/* Conteúdo da View aqui */}
			<Box.js />
		</View>
	);
}
