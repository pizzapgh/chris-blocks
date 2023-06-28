import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { RichText, InspectorControls, MediaUpload, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import './style.scss';
import Edit from './edit';
import save from './save';

const validAlignments = ['full'];

wp.blocks.registerBlockStyle('create-block/callout-block', [
    {
        name: 'default',
        label: 'Vertical',
        isDefault: true,
    },
    {
        name: 'horizontal',
        label: 'Horizontal',
    },
]);

import { createElement } from '@wordpress/element';

const el = createElement;

const iconEl = el('svg', { xmlns: "http://www.w3.org/2000/svg", xmlSpace: "preserve", width: 800, height: 800, viewBox: "0 0 333.848 333.848" },
  el('path', { d: "M228.873 0c-28.048 0-54.413 10.923-74.246 30.755-37.339 37.339-40.615 96.029-9.845 137.125l21.519-21.519v-.001l21.213-21.213 27.105-27.105 3.647-3.647c5.857-5.858 15.355-5.858 21.213-.001 5.857 5.857 5.858 15.356 0 21.214l-30.752 30.753-21.213 21.213-.007.007-.002.002-21.511 21.511-21.213-21.213-21.975 21.974-10.606-10.607c-.009-.009-.019-.016-.026-.024l-28.259-28.259c-5.858-5.859-15.357-5.858-21.214 0-5.857 5.857-5.857 15.354 0 21.213l17.678 17.678-67.174 67.174c-8.5 8.5-13.182 19.8-13.182 31.82.001 12.021 4.683 23.32 13.182 31.818 8.499 8.5 19.8 13.182 31.818 13.181 12.021.001 23.32-4.681 31.822-13.18l67.172-67.175 17.678 17.677a14.963 14.963 0 0 0 10.607 4.395c3.839 0 7.678-1.465 10.605-4.395 5.857-5.857 5.859-15.353 0-21.213l-28.27-28.269-.013-.015-10.606-10.607 21.965-21.963c18.053 13.56 39.906 20.897 62.888 20.897 28.046.001 54.415-10.922 74.245-30.754 40.941-40.94 40.94-107.553 0-148.493C283.288 10.922 256.919 0 228.873 0z", fill: "#000" })
);


registerBlockType('create-block/callout-block', {
    title: __('Callout Block', 'callout-block'),
    category: 'chris-blocks',
    icon: iconEl,
      example: {
         attributes: {
            mainHeading: "Hello World",
            mainContent: "Lorem Ipsum",
       },
    },
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
        cover: {
            type: 'string',
            default: '', // keep it empty so it doesn't get saved in the post content
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