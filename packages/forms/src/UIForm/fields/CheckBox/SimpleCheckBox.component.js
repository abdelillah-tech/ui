/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/no-autofocus */
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import CoralForm from '@talend/design-system/lib/components/Form';

export default function SimpleCheckBox({
	describedby,
	disabled,
	id,
	isValid,
	label,
	onChange,
	onFinish,
	schema,
	value,
}) {
	const { autoFocus } = schema;

	function getDataFeature() {
		const dataFeature = schema['data-feature'];
		return dataFeature ? `${dataFeature}.${value ? 'uncheck' : 'check'}` : undefined;
	}

	function getDataChecked() {
		if (value) {
			return 2;
		}
		return 0;
	}

	return (
		<CoralForm.Checkbox
			className={classnames('checkbox', { disabled })}
			id={id}
			autoFocus={autoFocus}
			disabled={disabled}
			onChange={event => {
				const isChecked = event.target.checked;
				onChange(event, { schema, value: isChecked });
				onFinish(event, { schema, value: isChecked });
			}}
			label={label}
			checked={value}
			data-checked={getDataChecked()}
			// eslint-disable-next-line jsx-a11y/aria-proptypes
			aria-invalid={!isValid}
			aria-describedby={describedby}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	SimpleCheckBox.propTypes = {
		describedby: PropTypes.string.isRequired,
		disabled: PropTypes.bool,
		id: PropTypes.string,
		isValid: PropTypes.bool,
		label: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			'data-feature': PropTypes.string,
			autoFocus: PropTypes.bool,
			disabled: PropTypes.bool,
		}),
		value: PropTypes.bool,
	};
}

SimpleCheckBox.defaultProps = {
	schema: {},
	value: false,
};
