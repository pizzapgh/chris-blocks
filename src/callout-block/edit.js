import { __ } from '@wordpress/i18n';
import { RichText, InspectorControls, MediaUpload, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';

import './editor.scss';

const ALLOWED_BLOCKS = ['core/button'];

export default function Edit({ classname, attributes, setAttributes }) {
  const blockProps = useBlockProps();

  const { blockBackground } = attributes;

  function onSelectBlockBackground(newBlockBackground) {
    setAttributes({
      blockBackground: newBlockBackground.sizes.full.url,
    });
  }

  return (
    [
      <InspectorControls>
        <PanelBody title={'Select Background Image'}>
          <p>
            <strong>Select a Background Image:</strong>
          </p>
          <MediaUpload
            onSelect={onSelectBlockBackground}
            type="image"
            value={attributes.blockBackground.url}
            render={({ open }) => (
              <Button className="editor-media-placeholder__button is-button is-default is-large" icon="upload" onClick={open}>
                Select Image
              </Button>
            )}
          />
        </PanelBody>
      </InspectorControls>,

      <div className={`wp-block-create-block-callout-block ${classname}`} {...blockProps}
      style={{
        backgroundImage: attributes.blockBackground !== '' ? `url("${attributes.blockBackground}")` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      >
        <div
          className="callout-cta">
          <div className="body-container">
            <RichText
              tagName="h2"
              value={attributes.mainHeading}
              onChange={(mainHeading) => setAttributes({ mainHeading })}
              placeholder={__('Main Heading')}
              className="main-heading"
            />
            <RichText
              tagName="p"
              value={attributes.mainContent}
              onChange={(mainContent) => setAttributes({ mainContent })}
              placeholder={__('Main Content')}
              className="main-content"
            />
          </div>
          <div className="button-container">
            <InnerBlocks {...blockProps} allowedBlocks={ALLOWED_BLOCKS} />
          </div>
        </div>
      </div>
    ]
  );
}
