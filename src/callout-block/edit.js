import { __ } from '@wordpress/i18n';
import { RichText, InspectorControls, MediaUpload, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, Button, ColorPicker } from '@wordpress/components';

import './editor.scss';

const ALLOWED_BLOCKS = ['core/button'];

export default function Edit({ classname, attributes, setAttributes }) {
  const blockProps = useBlockProps();

  const DEFAULT_BUTTON = [
    {
      name: 'core/button',
      attributes: {
        text: __('Button Text'),
      },
    },
  ];

  const { blockBackground, backgroundColor, cover } = attributes;

  function onSelectBlockBackground(newBlockBackground) {
    setAttributes({
      blockBackground: newBlockBackground.sizes?.full?.url || '',
    });
  }

  function onRemoveBlockBackground() {
    setAttributes({
      blockBackground: '',
    });
  }

  function onBackgroundColorChange(newColor) {
    setAttributes({
      backgroundColor: newColor,
    });
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Select Background Image')}>
          <p>
            <strong>{__('Select a Background Image:')}</strong>
          </p>
          <MediaUpload
            onSelect={onSelectBlockBackground}
            type="image"
            value={attributes.blockBackground.url}
            render={({ open }) => (
              <Button
                className="editor-media-placeholder__button is-button is-default is-large"
                icon="upload"
                onClick={open}
              >
                {__('Select Image')}
              </Button>
            )}
          />
          {blockBackground && (
            <Button
              className="editor-media-remove__button is-button is-default"
              onClick={onRemoveBlockBackground}
            >
              {__('Remove Image')}
            </Button>
          )}
        </PanelBody>
        <PanelBody title={__('Background Color')}>
          <p>
            <strong>{__('Select a Background Color:')}</strong>
          </p>
          <ColorPicker color={backgroundColor} onChange={onBackgroundColorChange} />
        </PanelBody>
      </InspectorControls>

      <div
        className={`wp-block-create-block-callout-block ${classname}`}
        {...blockProps}
        style={{
          backgroundImage: 'none', // Remove the background image style
          backgroundColor: attributes.backgroundColor || '',  // Set the background color dynamically
        }}
      >
        {blockBackground && (
          <div className="image-container">
            <img
              src={blockBackground}
              alt=""
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        )}

        <div className="callout-cta">
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
              placeholder={__('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')}
              className="main-content"
            />
          </div>
          <div className="button-container">
            <InnerBlocks
                     {...blockProps}
                     allowedBlocks={ALLOWED_BLOCKS}
                     template={DEFAULT_BUTTON}
                   />
          </div>
        </div>
      </div>
    </>
  );
}