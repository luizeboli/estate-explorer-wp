import { RadioControl, Spinner, BaseControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useAllTerms } from '@10up/block-components';
import { store as editorStore } from '@wordpress/editor';

const StatusTaxonomy = () => {
	const [statuses, hasResolvedStatuses] = useAllTerms('property_status');
	const currentStatus = useSelect((select) =>
		select(editorStore).getEditedPostAttribute('property_status'),
	);
	const { editPost } = useDispatch(editorStore);

	const isInvalid = !currentStatus.length;

	const handleChange = (newStatus) => {
		const value = Number(newStatus);
		editPost({ property_status: [value] });
	};

	if (!hasResolvedStatuses) return <Spinner />;

	return (
		<BaseControl
			help={isInvalid ? 'Required field' : null}
			className={isInvalid ? 'invalid-field' : null}
		>
			<BaseControl.VisualLabel>Status</BaseControl.VisualLabel>
			<RadioControl
				label="Status"
				hideLabelFromVision
				onChange={handleChange}
				options={statuses?.map((status) => ({ label: status.name, value: status.id }))}
				selected={currentStatus?.[0]}
			/>
		</BaseControl>
	);
};

export default StatusTaxonomy;
