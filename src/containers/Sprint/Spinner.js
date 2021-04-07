import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export function CircularProgressWithLabel({value}) {
	return (
		<Box position="relative" display="inline-flex">
			<CircularProgress variant="determinate" size={'3.5rem'} thickness={5} value={value * 1.67} />
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position="absolute"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Typography variant="h5" component="div" color="textPrimary">{value}</Typography>
			</Box>
		</Box>
	);
}