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
    <div className={`wp-block-create-block-callout-block ${className}`} {...blockProps}
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
         <RichText.Content tagName="h2" value={attributes.mainHeading} className="main-heading" />
         {attributes.mainContent && (
           <RichText.Content tagName="p" value={attributes.mainContent} className="main-content" />
         )}
       </div>
       <div className="button-container">
         <InnerBlocks.Content />
       </div>
      </div>
    </div>
  );
}