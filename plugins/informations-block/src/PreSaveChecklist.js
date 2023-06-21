/* eslint-disable @wordpress/no-unused-vars-before-return */
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { useEntityProp } from '@wordpress/core-data';
import { store as noticesStore } from '@wordpress/notices';
import { usePost, useSelectedTermIds } from '@10up/block-components';
import { store as editorStore } from '@wordpress/editor';

const PrevSaveChecklist = () => {
	const { title, isLocked } = useSelect((select) => ({
		title: select(editorStore).getEditedPostAttribute('title'),
		isLocked: select(editorStore).isPostSavingLocked(),
	}));

	const { postType } = usePost();
	const [{ description, location, price }] = useEntityProp('postType', postType, 'meta');
	const [amenities] = useSelectedTermIds('amenities');
	const [status] = useSelectedTermIds('property_status');

	const { lockPostSaving, unlockPostSaving } = useDispatch(editorStore);
	const { createNotice, removeNotice } = useDispatch(noticesStore);

	useEffect(() => {
		const hasEmptyFields = [title, description, location, price, status, amenities].some(
			(field) => !field || field.length === 0,
		);

		if (hasEmptyFields && !isLocked) {
			lockPostSaving();

			createNotice('error', 'Please fill out all fields before saving.', {
				id: 'no-empty-fields',
			});
		}

		if (!hasEmptyFields && isLocked) {
			unlockPostSaving();
			removeNotice('no-empty-fields');
		}
	}, [
		title,
		description,
		location,
		price,
		status,
		amenities,
		lockPostSaving,
		unlockPostSaving,
		createNotice,
		removeNotice,
		isLocked,
	]);

	return null;
};

export default PrevSaveChecklist;
