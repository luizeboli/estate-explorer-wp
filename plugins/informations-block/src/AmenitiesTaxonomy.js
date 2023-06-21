import { CheckboxControl, BaseControl, Spinner } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useAllTerms } from '@10up/block-components';
import { store as editorStore } from '@wordpress/editor';

const StatusTaxonomy = () => {
	const [amenities, hasResolvedAmenities] = useAllTerms('amenities');
	const currentAmenities = useSelect((select) =>
		select(editorStore).getEditedPostAttribute('amenities'),
	);
	const { editPost } = useDispatch(editorStore);

	const isInvalid = !currentAmenities.length;

	const handleChange = (amenityId) => (checked) => {
		if (checked) {
			editPost({ amenities: [...currentAmenities, amenityId] });
			return;
		}

		const filteredAmenities = currentAmenities.filter((id) => id !== amenityId);
		editPost({ amenities: filteredAmenities });
	};

	if (!hasResolvedAmenities) return <Spinner />;

	return (
		<BaseControl
			help={isInvalid ? 'Required field' : null}
			className={isInvalid ? 'invalid-field' : ''}
		>
			<BaseControl.VisualLabel>Amenities</BaseControl.VisualLabel>
			{amenities?.map((amenity) => (
				<CheckboxControl
					key={amenity.id}
					label={amenity.name}
					onChange={handleChange(amenity.id)}
					checked={currentAmenities.includes(amenity.id)}
				/>
			))}
		</BaseControl>
	);
};

export default StatusTaxonomy;
