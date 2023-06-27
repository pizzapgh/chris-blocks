import { __ } from '@wordpress/i18n';
import {
  RichText,
  InspectorControls,
  MediaUpload,
  useBlockProps,
  InnerBlocks
} from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';

export default function save({ className, attributes }) {
  const blockProps = useBlockProps.save({
    'data-align': attributes.align, // Add the data-align attribute with the align value
  });

  return (
    <div className={`wp-block-create-block-callout-block ${className}`} {...blockProps}>
      <div
        className="callout-cta"
        style={{
          backgroundImage: attributes.blockBackground !== '' ? `url("${attributes.blockBackground}")` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <RichText.Content
          tagName="h2"
          value={attributes.mainHeading}
          className="main-heading"
        />
        <RichText.Content
          tagName="p"
          value={attributes.mainContent}
          className="main-content"
        />
        <InnerBlocks.Content {...blockProps} />
      </div>
    </div>
  );
}