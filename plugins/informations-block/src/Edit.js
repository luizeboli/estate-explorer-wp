import { Panel, PanelBody, TextControl } from '@wordpress/components';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import './editor.scss';
import StatusTaxonomy from './StatusTaxonomy';

import AmenitiesTaxonomy from './AmenitiesTaxonomy';

const Edit = ({ attributes, setAttributes }) => {
	const { location, price, description } = attributes;
	const updateMetaValue = (metaKey) => (newValue) => {
		setAttributes({ [metaKey]: newValue });
	};

	return (
		<div {...useBlockProps()}>
			<RichText
				label="Description"
				placeholder="Type the Property description"
				onChange={updateMetaValue('description')}
				value={description}
			/>
			<Panel header="Property Informations">
				<PanelBody className="property-informations-body">
					<TextControl
						className={!price ? 'invalid-field' : ''}
						placeholder="Type the Property price"
						label="Price"
						value={price ?? ''}
						onChange={updateMetaValue('price')}
						type="number"
						help={!price ? 'Required field' : null}
					/>

					<TextControl
						className={!price ? 'invalid-field' : ''}
						placeholder="Type the Property location"
						label="Location"
						value={location ?? ''}
						onChange={updateMetaValue('location')}
						type="text"
						help={!price ? 'Required field' : null}
					/>

					<div className="taxonomies-row">
						<StatusTaxonomy />
						<AmenitiesTaxonomy />
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
};

export default Edit;
