import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { RichText, InspectorControls, MediaUpload, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import './style.scss';
import Edit from './edit';
import save from './save';

const validAlignments = ['full'];

registerBlockType('create-block/callout-block', {
    title: __('Callout Block', 'callout-block'),
    supports: {
        html: false,
        align: true,
    },
    attributes: {
        mainHeading: {
            type: 'string',
            source: 'html',
            selector: '.main-heading',
        },
        mainContent: {
            type: 'string',
            source: 'html',
            selector: '.main-content',
        },
        blockBackground: {
            type: 'string',
            default: '',
        },
        align: {
            type: 'string',
            default: 'full',
        },
    },
    getEditWrapperProps( attributes ) {
      const { align } = attributes;
      if (-1 !== validAlignments.indexOf( align ) ) {
        return { 'data-align': align };
      }
    },
    edit: Edit,
    save,
});
