import { __ } from '@wordpress/i18n';

import {
  RichText,
  InspectorControls,
  MediaUpload,
  useBlockProps,
  InnerBlocks
} from '@wordpress/block-editor';

import { PanelBody, Button } from '@wordpress/components';


const ALLOWED_BLOCKS = ['core/button'];


import './editor.scss';

export default function Edit({classname, attributes, setAttributes}) {

  const blockProps = useBlockProps();

  const {blockBackground} = attributes;

  function onSelectBlockBackground(newBlockBackground) {
    setAttributes({
        blockBackground: newBlockBackground.sizes.full.url,
    })
}

  return (
    [
        <InspectorControls>
            <PanelBody title={ 'Select Background Image' }>
                <p><strong>Select a Background Image:</strong></p>
                <MediaUpload
                    onSelect={onSelectBlockBackground}
                    type="image"
                    value={ attributes.blockBackground.url }
                    render={ ( { open } ) => (
                      <Button
                        className="editor-media-placeholder__button is-button is-default is-large"
                        icon="upload"
                        onClick={ open }>
                        Select Image
                      </Button>
                    )}/>
            </PanelBody>
        </InspectorControls>,

        <div class="wp-block-create-block-callout-block" {...blockProps}>

          <div class="callout-cta" style={{
            backgroundImage: attributes.blockBackground != '' ? 'url("' + attributes.blockBackground + '")' : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
            <RichText
              tagName="h2"
              value={attributes.mainHeading}
              onChange={(mainHeading) => setAttributes({mainHeading})}
              placeholder={ __('Main Heading')}
              className="main-heading"
            />
            <RichText
              tagName="p"
              value={attributes.mainContent}
              onChange={(mainContent) => setAttributes({mainContent})}
              placeholder={ __('Main Content')}
              className="main-content"
            />
            <InnerBlocks {...blockProps} allowedBlocks={ALLOWED_BLOCKS} />
          </div>

        </div>
    ]
  );
}
