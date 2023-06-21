import { registerPlugin } from '@wordpress/plugins';
import { registerBlockType } from '@wordpress/blocks';
import PreSaveChecklist from './PreSaveChecklist';
import metadata from './block.json';
import Edit from './Edit';

registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
});

registerPlugin('pre-save-checklist', { render: PreSaveChecklist });
