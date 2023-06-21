import { TextControl, PanelRow } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

const PropertyInformations = () => {
	const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);

	const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

	const updateMetaValue = (metaKey) => (newValue) => {
		setMeta({ ...meta, [metaKey]: newValue });
	};

	return (
		<PluginDocumentSettingPanel name="propertyInformationsPanel" title="Property Informations">
			<PanelRow>
				<TextControl
					label="Price"
					value={meta.price ?? ''}
					onChange={updateMetaValue('price')}
					type="number"
				/>
			</PanelRow>
			<PanelRow>
				<TextControl
					label="Location"
					value={meta.location ?? ''}
					onChange={updateMetaValue('location')}
					type="text"
				/>
			</PanelRow>
		</PluginDocumentSettingPanel>
	);
};

export default PropertyInformations;
